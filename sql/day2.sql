
-- sql day 2 - joins

-- lesson 6

-- movie sales
SELECT title, domestic_sales, international_sales
FROM movies
INNER JOIN boxoffice
ON movies.id = boxoffice.movie_id;

-- movies which earned more internationally
SELECT title, domestic_sales, international_sales
FROM movies
INNER JOIN boxoffice
ON movies.id = boxoffice.movie_id
WHERE international_sales > domestic_sales;

-- movies sorted by rating
SELECT title, rating
FROM movies
INNER JOIN boxoffice
ON movies.id = boxoffice.movie_id
ORDER BY rating DESC;


-- lesson 7

-- buildings that have employees
SELECT DISTINCT building
FROM employees
WHERE building IS NOT NULL;

-- checking building capacity
SELECT building_name, capacity
FROM buildings;

-- buildings and employee roles
SELECT DISTINCT b.building_name, e.role
FROM buildings b
LEFT JOIN employees e
ON b.building_name = e.building;
