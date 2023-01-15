CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS POSTGIS;
CREATE EXTENSION IF NOT EXISTS POSTGIS_TOPOLOGY;

drop table if EXISTS movies;
drop table if EXISTS cities;

CREATE TABLE public.cities (
    id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(250) NOT NULL unique,
    geom            GEOMETRY,
    created_on      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_on      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE public.movies (
    id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    listed_in            VARCHAR(250) NOT NULL,
    title               VARCHAR(250) NOT NULL unique,
    rating          VARCHAR(250) NOT NULL,
    director        VARCHAR(250) NOT NULL,
    score           real NOT NULL,
    duration        VARCHAR(250) NOT NULL,
    city_id             uuid,
    created_on      TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_on      TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE movies
    ADD CONSTRAINT movies_cities_id_fk
        FOREIGN KEY (city_id) REFERENCES cities(id)
            ON DELETE CASCADE;