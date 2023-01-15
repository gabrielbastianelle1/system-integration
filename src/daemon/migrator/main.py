import sys
import time
import requests
import numpy as np


import psycopg2
from psycopg2 import OperationalError

POLLING_FREQ = int(sys.argv[1]) if len(sys.argv) >= 2 else 60


def print_psycopg2_exception(ex):
    # get details about the exception
    err_type, err_obj, traceback = sys.exc_info()

    # get the line number when exception occured
    line_num = traceback.tb_lineno

    # print the connect() error
    print("\npsycopg2 ERROR:", ex, "on line number:", line_num)
    print("psycopg2 traceback:", traceback, "-- type:", err_type)

    # psycopg2 extensions.Diagnostics object attribute
    print("\nextensions.Diagnostics:", ex.diag)

    # print the pgcode and pgerror exceptions
    print("pgerror:", ex.pgerror)
    print("pgcode:", ex.pgcode, "\n")

def get_all_movies(cursor) -> list:
    query = "with movie as (SELECT unnest(xpath('(.//movie)', xml)) as m from imported_documents where id=1) SELECT (xpath('//title/text()', m))[1]::text as title, (xpath('//score/text()', m))[1]::text::float as score, (xpath('//duration/text()', m))[1]::text as duration, (xpath('//rating/text()', m))[1]::text as rating, (xpath('//city/text()', m))[1]::text as city, (xpath('//listed_in/text()', m))[1]::text as category, (xpath('//director/text()', m))[1]::text as director FROM movie"
    cursor.execute(query)

    movies = []

    for movie in cursor:
        movie_list = list(movie)
        movie_list[0] = remove_special_characters(movie_list[0])
        movie_list[5] = remove_special_characters(movie_list[5])
        movie_list[6] = remove_special_characters(movie_list[6])
        movies.append(movie_list)

    return movies


def get_all_cities(cursor) -> list:
    query = "select unnest(xpath('.//city/text()', xml))::text as city,unnest(xpath('.//city/@lon', xml))::text as lon, unnest(xpath('.//city/@lat', xml))::text as lat from imported_documents where id = 1;"
    cursor.execute(query)
    return list(cursor)


def clean_duplicated_cities(cities: list) -> list:
    set_res = set(cities)
    cities = (list(set_res))

    return cities

def remove_special_characters(value: str) -> str:
        special_characters = ["@", "#", "$", "*", "&", "'"]
        normal_string = value

        for i in special_characters:
            normal_string = normal_string.replace(i, "and")

        return normal_string

def insert_cities_to_rel_database() -> None:
    for city in cities:
        query = f"insert into cities(name,geom) values ('{city[0]}', ST_GeomFromText('POINT({city[1]}  {city[2]})', 4326))"
        rel_cursor.execute(query)

        query = f"select * from cities where name = '{city[0]}'"
        rel_cursor.execute(query)
        cities_inserted.append(rel_cursor.fetchone())
        db_dst.commit()

def insert_movies_to_rel_database() -> None:
    for movie in movies:
        query = f"insert into movies (listed_in, title, rating, director, score, duration, city_id) values ('{movie[5]}', '{movie[0]}', '{movie[3]}', '{movie[6]}', {movie[1]}, '{movie[2]}', '{get_city_id(movie[4])}')"
        rel_cursor.execute(query)

        query = f"select * from movies where title = '{movie[0]}'"
        rel_cursor.execute(query)
        movies_inserted.append(rel_cursor.fetchone())
        db_dst.commit()

def send_movies_to_api_entities() -> None:
    for movie in movies_inserted:
        data = {
            'id': movie[0],
            'listed_in': movie[1],
            'title': movie[2],
            'rating': movie[3],
            'director': movie[4],
            'score': movie[5],
            'duration': movie[6],
            'city_id': movie[7]
        }

        url = "http://api-entities:8080/api/movies/"
        response_city=requests.post(url, json=data)

def send_cities_to_api_entities() -> None:
    for city in cities_inserted:
        data = {
            'id': city[0],
            'name': city[1],
            'geom': city[2]
        }

        url = "http://api-entities:8080/api/cities/"
        response_city=requests.post(url, json=data)


def get_city_id(city_name: str) -> str:
    for city in cities_inserted:
        if(city[1] == city_name):
            return city[0]


if __name__ == "__main__":

    movies=[]
    cities=[]
    imported_documents=[]

    db_org = psycopg2.connect(host='db-xml', database='is', user='is', password='is')

    while True:

        # Connect to both databases
        db_org = None
        db_dst = None

        try:
            db_org = psycopg2.connect(host='db-xml', database='is', user='is', password='is')
            xml_cursor = db_org.cursor()
            db_dst = psycopg2.connect(host='db-rel', database='is', user='is', password='is')
            rel_cursor = db_dst.cursor()
        except OperationalError as err:
            print_psycopg2_exception(err)

        if db_dst is None or db_org is None:
            continue

        print("Checking updates...")
        # !TODO: 1- Execute a SELECT query to check for any changes on the table

        query="select * from imported_documents"
        xml_cursor.execute(query)

        if(len(imported_documents)==0):
            imported_documents=xml_cursor.fetchall()
            print(imported_documents)

        if(not np.array_equal(imported_documents, xml_cursor.fetchall())):

            # !TODO: 2- Execute a SELECT queries with xpath to retrieve the data we want to store in the relational db
            movies=get_all_movies(xml_cursor)
            cities=get_all_cities(xml_cursor)
            cities=clean_duplicated_cities(cities)

            # !TODO: 3- Execute INSERT queries in the destination db
            cities_inserted=[]
            movies_inserted=[]

            insert_cities_to_rel_database()
            send_cities_to_api_entities()

            insert_movies_to_rel_database()
            send_movies_to_api_entities()
        else:
            print('nenhuma mudança')

        # !TODO: 4- Make sure we store somehow in the origin database that certain records were already migrated.
        #          Change the db structure if needed.

        db_org.close()
        db_dst.close()

        time.sleep(POLLING_FREQ)
