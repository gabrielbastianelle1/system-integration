import csv
import xml.dom.minidom as md
import xml.etree.ElementTree as ET

from utils.reader import CSVReader
from entities.country import Country
from entities.team import Team
from entities.player import Player


import pandas as pd

class CSVtoXMLConverter:

    def __init__(self, path):
        self.path = path
        self._reader = CSVReader(path)
        self.filmes=self._reader.read_csv_file()
        self.movies = ET.Element("movies")
        self.dataset = pd.DataFrame()
        self.series = pd.Series()

        self.read_csv()
        self.create_types_tag()
        self.create_release_year_tag()
        self.create_country_tag()
        self.create_movie_tag()

    def read_csv(self) -> None:

        self.dataset = pd.read_csv(self.path)

    def create_types_tag(self) -> None:
        self.series = self.dataset.groupby(["type"])["type"].count()

        for campo in self.series.keys():
            tipo = ET.Element("type", attrib={"type": f"{campo}"})
            self.movies.append(tipo)

    def create_release_year_tag(self) -> None:
        self.series = self.dataset.groupby(["release_year", "type"])["type"].count()

        for campo in self.series.keys():
            type = self.movies.findall(f".//type[@type='{campo[1]}']")
            year = ET.Element("release_year", attrib={"release_year": f"{campo[0]}"})
            type[0].append(year)

    def create_country_tag(self) -> None:
        self.series = self.dataset.groupby(["release_year", "type", "country"])[
            "type"
        ].count()

        for campo in self.series.keys():
            parent = self.movies.findall(
                f".//type[@type='{campo[1]}']/release_year[@release_year='{campo[0]}']"
            )
            country = ET.Element("country", attrib={"country": f"{campo[2]}"})
            parent[0].append(country)

    def create_movie_tag(self) -> None:
        for filme in self.filmes:
            parent = self.movies.findall(
                f".//type[@type='{filme['type']}']/release_year[@release_year='{filme['release_year']}']/country[@country='{filme['country']}']"
            )
            movie = ET.Element("movie", attrib={"id": f'{filme["show_id"]}'})
            ET.SubElement(
                movie,
                "city",
                attrib={"lat": f'{filme["lat"]}', "lon": f'{filme["lon"]}'},
            ).text = f'{filme["city"]}'
            ET.SubElement(movie, "listed_in").text = f'{filme["listed_in"]}'
            ET.SubElement(movie, "title").text = f'{filme["title"]}'
            ET.SubElement(movie, "rating").text = f'{filme["rating"]}'
            ET.SubElement(movie, "score").text = f'{filme["score"]}'
            ET.SubElement(movie, "duration").text = f'{filme["duration"]}'
            ET.SubElement(movie, "director").text = f'{filme["director"]}'

            parent[0].append(movie)

    def to_xml_str(self):
        xml_str = ET.tostring(self.movies, encoding='utf8', method='xml').decode()
        dom = md.parseString(xml_str)
        return dom.toprettyxml()

