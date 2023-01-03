from csv import DictReader
import csv
import json

class CSVReader:

    def __init__(self, path, delimiter=','):
        self._path = path
        self._delimiter = delimiter
        self.filmes = {}
        print('oi ta dani bom')

    def read_csv_file(self) -> None:
        csv_file = open(self._path, newline="")
        self.filmes = csv.DictReader(csv_file)
        return self.filmes

    """ def loop(self):
        with open(self._path, 'r') as file:
            for row in DictReader(file, delimiter=self._delimiter):
                yield row
        file.close()

    def read_entities(self, attr, builder, after_create=None):
        entities = {}
        for row in self.loop():
            e = row[attr]
            if e not in entities:
                entities[e] = builder(row)
                after_create is not None and after_create(entities[e], row)

        return entities """
