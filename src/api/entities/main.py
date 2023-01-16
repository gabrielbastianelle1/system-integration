import sys

from flask import Flask, jsonify, request

from entities.city import City
from entities.movie import Movie

import psycopg2
from psycopg2 import OperationalError

from flask_cors import CORS, cross_origin

import requests

PORT = int(sys.argv[1]) if len(sys.argv) >= 2 else 9000

# set of all teams
# !TODO: replace by database access

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

def connect_to_database():
    db_dst = psycopg2.connect(host='db-rel', database='is', user='is', password='is')
    rel_cursor = db_dst.cursor()
    return db_dst, rel_cursor

def get_city_id(city_name: str) -> str:
    url = "http://api-entities:8080/api/cities/"
    response_city=requests.get(url)

    for city in response_city.json():
        if(city['name'] == city_name):
            return city['id']

@app.route('/api/teste/', methods=['GET'])
#@cross_origin()
def teste():
    return "oi"

@app.route('/api/cities/', methods=['GET'])
def get_cities():
    query = "select * from cities"
    db_dst, rel_cursor=connect_to_database()
    rel_cursor.execute(query)
    cities = rel_cursor.fetchall()
    cities_json = []

    for value in cities:
        city = City(id=value[0], name=value[1], geom=value[2], created_on=value[3], updated_on=value[4])
        cities_json.append(city)

    db_dst.close()

    return jsonify([city.__dict__ for city in cities_json])


@app.route('/api/cities/', methods=['POST'])
def insert_one_city():
    data = request.get_json()
    query = f"insert into cities(name,geom) values ('{data[0]}', ST_GeomFromText('POINT({data[1]}  {data[2]})', 4326))"
    db_dst, rel_cursor=connect_to_database()
    rel_cursor.execute(query)
    db_dst.commit()

    db_dst.close()

    return "city inserted", 201


@app.route('/api/movies/', methods=['GET'])
def get_movies():
    query = "select * from movies"
    db_dst, rel_cursor=connect_to_database()
    rel_cursor.execute(query)
    movies = rel_cursor.fetchall()
    movies_json = []

    for value in movies:
        movie = Movie(id=value[0],listed_in=value[1], title=value[2], rating=value[3], director=value[4], score=value[5], duration=value[6], city_id=value[7], created_on=value[8], updated_on=value[9])
        movies_json.append(movie)

    db_dst.close()

    return jsonify([movie.__dict__ for movie in movies_json])


@app.route('/api/movies/', methods=['POST'])
def create_one_movie():
    data = request.get_json()
    db_dst, rel_cursor=connect_to_database()
    query = f"insert into movies (listed_in, title, rating, director, score, duration, city_id) values ('{data[5]}', '{data[0]}', '{data[3]}', '{data[6]}', {data[1]}, '{data[2]}', '{get_city_id(data[4])}')"
    rel_cursor.execute(query)
    db_dst.commit()

    db_dst.close()
    return "movie inserted", 201

@app.route('/api/movies/insert', methods=['POST'])
def insert_one_movie():
    data = request.get_json()
    db_dst, rel_cursor=connect_to_database()
    query = f"insert into movies (listed_in, title, rating, director, score, duration, city_id) values ('{data['listed_in']}', '{data['title']}', '{data['rating']}', '{data['director']}', {data['score']}, '{data['duration']}', '{data['city_id']}')"
    rel_cursor.execute(query)
    db_dst.commit()

    db_dst.close()
    return "movie inserted", 201

""" @app.route('/api/movies/getcityname/<str:id>', methods=['GET'])
def get_city_name(id):
    query = f'select name from cities where id = {id}'
    db_dst, rel_cursor=connect_to_database()
    rel_cursor.execute(query)
    name = rel_cursor.fetchall()

    db_dst.close()

    return name """


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=PORT)
