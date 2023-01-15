import uuid
from datetime import datetime


class Movie:
    def __init__(self, id=None, created_on=None, updated_on=None, listed_in=None, title=None, rating=None, director=None, score=None, duration=None, city_id=None):
        self.id = id or uuid.uuid4()
        self.listed_in = listed_in
        self.title = title
        self.rating = rating
        self.director = director
        self.score = score
        self.duration = duration
        self.city_id = city_id
        self.created_on = created_on or datetime.now()
        self.updated_on = updated_on or datetime.now()
