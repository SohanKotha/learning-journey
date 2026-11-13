
-- sql day 3 - group by and aggregate functions

-- lesson 10

-- longest time an employee worked
SELECT MAX(years_employed)
FROM employees;

-- average years for each role
SELECT role, AVG(years_employed)
FROM employees
GROUP BY role;

-- total years worked in each building
SELECT building, SUM(years_employed)
FROM employees
GROUP BY building;


-- lesson 11

-- how many artists are there
SELECT COUNT(*)
FROM employees
WHERE role = 'Artist';

-- number of employees for each role
SELECT role, COUNT(*)
FROM employees
GROUP BY role;

-- total years worked by engineers
SELECT SUM(years_employed)
FROM employees
WHERE role = 'Engineer';

-- sql day 3 - group by and aggregate functions

-- lesson 10

-- longest time an employee worked
SELECT MAX(years_employed)
FROM employees;

-- average years for each role
SELECT role, AVG(years_employed)
FROM employees
GROUP BY role;

-- total years worked in each building
SELECT building, SUM(years_employed)
FROM employees
GROUP BY building;


-- lesson 11

-- how many artists are there
SELECT COUNT(*)
FROM employees
WHERE role = 'Artist';

-- number of employees for each role
SELECT role, COUNT(*)
FROM employees
GROUP BY role;

-- total years worked by engineers
SELECT SUM(years_employed)
FROM employees
WHERE role = 'Engineer';



-- bhanu interview sql question

-- employees count by state
SELECT l.state, COUNT(*) AS employee_count
FROM employee e
JOIN employee_work_location l
ON e.employee_id = l.employee_id
GROUP BY l.state;


-- states with more than 5 employees
SELECT l.state, COUNT(*) AS employee_count
FROM employee e
JOIN employee_work_location l
ON e.employee_id = l.employee_id
GROUP BY l.state
HAVING COUNT(*) > 5;


-- states with highest employee count first
SELECT l.state, COUNT(*) AS employee_count
FROM employee e
JOIN employee_work_location l
ON e.employee_id = l.employee_id
GROUP BY l.state
ORDER BY employee_count DESC;
