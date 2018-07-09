CREATE TABLE users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, photo TEXT, current_company_id INTEGER REFERENCES companies (id) ON DELETE CASCADE);
INSERT INTO users (first_name, last_name, email, photo) VALUES ('Tyler', 'Ketron', 'tketron@gmailcom', 'http//www.fakeavatar.com');

CREATE TABLE companies (id SERIAL PRIMARY KEY, name TEXT, logo TEXT);
INSERT INTO companies (name, logo) VALUES ('Haley & Aldrich', 'http://www.haleyandaldrich.com');

CREATE TABLE jobs (id SERIAL PRIMARY KEY, title TEXT, salary INTEGER, equity REAL, company_id INTEGER REFERENCES companies (id) ON DELETE CASCADE);
INSERT INTO jobs (title, salary, equity, company_id) VALUES ('Teacher', '100000', '4', 1);

CREATE TABLE jobs_users (id SERIAL PRIMARY KEY, job_id INTEGER REFERENCES jobs (id) ON DELETE CASCADE, company_id INTEGER REFERENCES companies (id) ON DELETE CASCADE);
INSERT INTO jobs_users (job_id, company_id) VALUES (1, 2);