
-- sql day 1 practice

-- lesson 1 - select queries

-- movie titles
SELECT title FROM movies;

-- getting directors
SELECT director FROM movies;

-- title and director together
SELECT title, director FROM movies;

-- movies with release year
SELECT title, year FROM movies;

-- all movie details
SELECT * FROM movies;


-- lesson 2 - where conditions

-- movie with id 6
SELECT *
FROM movies
WHERE id = 6;

-- movies released between 2000 and 2010
SELECT *
FROM movies
WHERE year BETWEEN 2000 AND 2010;

-- checking movies outside these years
SELECT *
FROM movies
WHERE year NOT BETWEEN 2000 AND 2010;

-- first 5 movies with year
SELECT title, year
FROM movies
LIMIT 5;


-- lesson 3 - text conditions

-- finding toy story movies
SELECT *
FROM movies
WHERE title LIKE 'Toy Story%';

-- movies directed by john lasseter
SELECT *
FROM movies
WHERE director = 'John Lasseter';

-- movies by other directors
SELECT title, director
FROM movies
WHERE director != 'John Lasseter';

-- checking wall-e movie
SELECT *
FROM movies
WHERE title LIKE 'WALL-%';


-- lesson 4 - sorting and filtering

-- getting unique directors in alphabetical order
SELECT DISTINCT director
FROM movies
ORDER BY director ASC;

-- latest 4 movies
SELECT *
FROM movies
ORDER BY year DESC
LIMIT 4;

-- first 5 movies alphabetically
SELECT *
FROM movies
ORDER BY title ASC
LIMIT 5;

-- next 5 movies
SELECT *
FROM movies
ORDER BY title ASC
LIMIT 5 OFFSET 5;
