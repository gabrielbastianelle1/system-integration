from csv import DictReader
import csv
import json

class CSVReader:

    def __init__(self, path, delimiter=','):
        self._path = path
        self._delimiter = delimiter
        self.filmes = {}

    def read_csv_file(self) -> None:
        csv_file = open(self._path, newline="")
        self.filmes = csv.DictReader(csv_file)
        return self.filmes