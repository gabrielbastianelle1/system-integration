import sys

from flask import Flask, request

import psycopg2
from psycopg2 import OperationalError

from flask_cors import CORS, cross_origin


PORT = int(sys.argv[1]) if len(sys.argv) >= 2 else 9000

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

def connect_to_database():
    db_xml = psycopg2.connect(host='db-xml', database='is', user='is', password='is')
    xml_cursor = db_xml.cursor()
    return db_xml, xml_cursor


@app.route('/api/movies/order', methods=['GET'])
def order_total_movies_per_country():

    order = request.args.get('order')

    query = f"select unnest(xpath('.//type/release_year/country/@country', xml))::text as countries, count(*) as total_movies from imported_documents where id = 1 group by countries order by total_movies {order};"
    db_xml, xml_cursor=connect_to_database()
    xml_cursor.execute(query)
    response = xml_cursor.fetchall()

    db_xml.close()

    return response

@app.route('/api/movies/score', methods=['GET'])
def order_movie_per_score():

    score = request.args.get('score')

    query = f"select unnest(xpath('(.//type/release_year/country/movie[number(score)>number({score})])/title/text()', xml))::text as title,unnest(xpath('(.//type/release_year/country/movie[number(score)>number({score})])/score/text()', xml))::text::float as score from imported_documents where id = 1 order by score desc;"
    db_xml, xml_cursor=connect_to_database()
    xml_cursor.execute(query)
    response = xml_cursor.fetchall()

    db_xml.close()

    return response

@app.route('/api/movies/data', methods=['GET'])
def get_all_data_movie():

    title = request.args.get('title')

    query = f'''with movie as (
                SELECT
                    unnest(xpath('(.//movie[title =\"{title}\"])', xml)) as m
                from
                    imported_documents
                where
                    id=1)
                SELECT
                    (xpath('//title/text()', m))[1]::text as title,
                    (xpath('//score/text()', m))[1]::text::float as score,
                    (xpath('//duration/text()', m))[1]::text as duration,
                    (xpath('//rating/text()', m))[1]::text as rating,
                    (xpath('//city/text()', m))[1]::text as city,
                    (xpath('//listed_in/text()', m))[1]::text as category,
                    (xpath('//director/text()', m))[1]::text as director
                FROM movie'''

    db_xml, xml_cursor=connect_to_database()
    xml_cursor.execute(query)
    response = xml_cursor.fetchall()

    db_xml.close()

    return response

@app.route('/api/movies/rating', methods=['GET'])
def count_movies_per_rating():

    year = request.args.get('year')

    query = f"select unnest(xpath('(.//type/release_year[@release_year=number({year})]/country/movie)/rating/text()', xml))::text as rating, count(*) as totalMovies from imported_documents where id = 1 group by rating order by totalmovies desc;"

    db_xml, xml_cursor=connect_to_database()
    xml_cursor.execute(query)
    response = xml_cursor.fetchall()

    db_xml.close()

    return response


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=PORT)
