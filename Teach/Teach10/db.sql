 CREATE TABLE person (
 id    serial PRIMARY KEY,
 first_name  varchar(45),
 last_name  varchar(45),
 birthdate date NOT NULL);

 INSERT INTO person (first_name,
                      last_name,
                      birthdate)
  VALUES ('Bob', 'Parr', '1970-01-08'),
  ('Helen', 'Parr', '1973-01-08'),
  ('Violet', 'Parr', '1999-01-08'),
  ('Dash', 'Parr', '2003-01-08'),
  ('Jack-Jack', 'Parr', '2009-01-08');


CREATE TABLE parent_child (
 id    			serial PRIMARY KEY,
 parent_id     	int REFERENCES person (id),
 child_id  		int REFERENCES person (id));


INSERT INTO parent_child (parent_id,
                           child_id)
 VALUES ((SELECT id FROM person WHERE first_name = 'Helen'), (SELECT id FROM person WHERE first_name = 'Violet')),
 ((SELECT id FROM person WHERE first_name = 'Helen'), (SELECT id FROM person WHERE first_name = 'Dash')),
 ((SELECT id FROM person WHERE first_name = 'Helen'), (SELECT id FROM person WHERE first_name = 'Jack-Jack')),
 ((SELECT id FROM person WHERE first_name = 'Bob'), (SELECT id FROM person WHERE first_name = 'Violet')),
 ((SELECT id FROM person WHERE first_name = 'Bob'), (SELECT id FROM person WHERE first_name = 'Dash')),
 ((SELECT id FROM person WHERE first_name = 'Bob'), (SELECT id FROM person WHERE first_name = 'Jack-Jack'));
