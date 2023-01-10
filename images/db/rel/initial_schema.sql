CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS POSTGIS;
CREATE EXTENSION IF NOT EXISTS POSTGIS_TOPOLOGY;

CREATE TABLE public.types (
	id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	name            VARCHAR(250) NOT NULL,
	created_on      TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_on      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE public.years (
	id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    type_id         uuid,
	year            int NOT NULL,
	created_on      TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_on      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE public.countries (
	id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	country            VARCHAR(250) UNIQUE NOT NULL,
	year_id            uuid,
    type_id             uuid,
	created_on      TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_on      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE public.movies (
	id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	city            VARCHAR(250) NOT NULL,
	listed_in            VARCHAR(250) NOT NULL,
    title               VARCHAR(250) NOT NULL,
    rating          VARCHAR(250) NOT NULL,
    director        VARCHAR(250) NOT NULL,
    score           real NOT NULL,
    duration        int NOT NULL,
    type_id             uuid,
	year_id            uuid,
	country_id      uuid NOT NULL,
	created_on      TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_on      TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE years
    ADD CONSTRAINT years_types_id_fk
        FOREIGN KEY (type_id) REFERENCES types(id)
            ON DELETE CASCADE;

ALTER TABLE countries
    ADD CONSTRAINT countries_types_id_fk
        FOREIGN KEY (type_id) REFERENCES types(id)
            ON DELETE CASCADE;

ALTER TABLE countries
    ADD CONSTRAINT countries_year_id_fk
        FOREIGN KEY (year_id) REFERENCES years(id)
            ON DELETE CASCADE;


ALTER TABLE movies
    ADD CONSTRAINT movies_types_id_fk
        FOREIGN KEY (type_id) REFERENCES types(id)
            ON DELETE CASCADE;

ALTER TABLE movies
    ADD CONSTRAINT movies_years_id_fk
        FOREIGN KEY (year_id) REFERENCES years(id)
            ON DELETE CASCADE;

ALTER TABLE movies
    ADD CONSTRAINT movies_countries_id_fk
        FOREIGN KEY (country_id) REFERENCES countries(id)
            ON DELETE CASCADE;