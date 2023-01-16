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
    db_dst = psycopg2.connect(host='db-rel', database='is', user='is', password='is')
    rel_cursor = db_dst.cursor()
    return db_dst, rel_cursor


@app.route('/api/tile', methods=['GET'])
def get_markers():
    neLat = request.args.get('neLat')
    neLng = request.args.get('neLng')
    swLat = request.args.get('swLat')
    swLng = request.args.get('swLng')

    neLat = float(neLat)
    neLng = float(neLng)
    swLat = float(swLat)
    swLng = float(swLng)

    db_dst, rel_cursor=connect_to_database()


    query = f"SELECT (SELECT jsonb_build_object('type', 'Feature','geometry', ST_AsGeoJSON(cities.geom)::jsonb,'properties', to_jsonb( t.* )  - 'geom') AS json FROM (VALUES (cities.id, cities.name, 'POINT(1 1)'::geometry)) AS t(id, name, geom)) FROM cities WHERE cities.geom && ST_MakeEnvelope({neLat}, {neLng}, {swLat}, {swLng}, 4326); "

    rel_cursor.execute(query)
    result = rel_cursor.fetchall()

    db_dst.close()

    return result

@app.route('/api/tile/all', methods=['GET'])
def get_geo_json_all_cities():
    db_dst, rel_cursor=connect_to_database()


    query = "SELECT (SELECT jsonb_build_object('type', 'Feature','geometry', ST_AsGeoJSON(cities.geom)::jsonb,'properties', to_jsonb( t.* )  - 'geom') AS json FROM (VALUES (cities.id, cities.name, 'POINT(1 1)'::geometry)) AS t(id, name, geom)) FROM cities"

    rel_cursor.execute(query)
    result = rel_cursor.fetchall()

    db_dst.close()

    return result

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=PORT)