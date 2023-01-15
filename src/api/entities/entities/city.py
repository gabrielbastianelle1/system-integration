import uuid
from datetime import datetime


class City:
    def __init__(self, name, id=None, created_on=None, updated_on=None, geom=None):
        self.id = id or uuid.uuid4()
        self.name = name
        self.geom = geom
        self.created_on = created_on or datetime.now()
        self.updated_on = updated_on or datetime.now()