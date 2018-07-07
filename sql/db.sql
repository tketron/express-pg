CREATE TABLE users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, photo TEXT, current_company_id INTEGER REFERENCES companies (id) ON DELETE CASCADE);
INSERT INTO users (first_name, last_name, email, photo) VALUES ('Tyler', 'Ketron', 'tketron@gmailcom', 'http//www.fakeavatar.com');

CREATE TABLE companies (id SERIAL PRIMARY KEY, name TEXT, logo TEXT);
INSERT INTO companies (name, logo) VALUES ('Haley & Aldrich', 'http://www.haleyandaldrich.com');