import sys

from flask import Flask, jsonify, request

from entities.city import City
from entities.movie import Movie

import psycopg2
from psycopg2 import OperationalError

PORT = int(sys.argv[1]) if len(sys.argv) >= 2 else 9000

# set of all teams
# !TODO: replace by database access
movies = []
cities = []

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/api/cities/', methods=['GET'])
def get_cities():
    return jsonify([city.__dict__ for city in cities])


@app.route('/api/cities/', methods=['POST'])
def insert_one_city():
    data = request.get_json()

    city = City(id=data['id'], name=data['name'], geom=data['geom'])
    cities.append(city)

    return "city inserted", 201


@app.route('/api/movies/', methods=['GET'])
def get_movies():
    return jsonify([movie.__dict__ for movie in movies])


@app.route('/api/movies/', methods=['POST'])
def create_one_movie():
    data = request.get_json()

    movie = Movie(id=data['id'],listed_in=data['listed_in'], title=data['title'], rating=data['rating'], director=data['director'], score=data['score'], duration=data['duration'], city_id=data['city_id'])
    movies.append(movie)

    return "movie inserted", 201

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=PORT)


@app.route('/api/movies/')