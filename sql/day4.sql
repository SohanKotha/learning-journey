-- day 4 sql practice

-- creating employee and location tables for practice

DECLARE @Employees TABLE (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    department VARCHAR(50)
);

DECLARE @WorkLocations TABLE (
    employee_id INT PRIMARY KEY,
    city VARCHAR(50),
    state VARCHAR(20)
);

-- adding some employee details

INSERT INTO @Employees (employee_id, employee_name, department)
VALUES
(1, 'Rikshith', 'IT'),
(2, 'Kishith', 'HR'),
(3, 'Rushwanth', 'Finance'),
(4, 'Sreeram', 'IT'),
(5, 'Bhavana', 'HR'),
(6, 'Saroj', 'Finance'),
(7, 'Ananya', 'IT');

-- locations for employees

INSERT INTO @WorkLocations (employee_id, city, state)
VALUES
(1, 'Jersey City', 'NJ'),
(2, 'Austin', 'TX'),
(3, 'Newark', 'NJ'),
(4, 'New York', 'NY'),
(5, 'Kearny', 'NJ'),
(6, 'Buffalo', 'NY');


-- joining employee and location tables

SELECT
    e.employee_name,
    e.department,
    w.city,
    w.state
FROM @Employees e
INNER JOIN @WorkLocations w
ON e.employee_id = w.employee_id;


-- counting employees from each state

SELECT
    w.state,
    COUNT(*) AS employee_count
FROM @Employees e
INNER JOIN @WorkLocations w
ON e.employee_id = w.employee_id
GROUP BY w.state
ORDER BY employee_count DESC;


-- states with more than 1 employee

SELECT
    w.state,
    COUNT(*) AS employee_count
FROM @Employees e
INNER JOIN @WorkLocations w
ON e.employee_id = w.employee_id
GROUP BY w.state
HAVING COUNT(*) > 1;


-- trying left join to get all employees
-- ananya doesn't have any location so it will show null

SELECT
    e.employee_name,
    e.department,
    w.city,
    w.state
FROM @Employees e
LEFT JOIN @WorkLocations w
ON e.employee_id = w.employee_id;


-- getting only nj employees

SELECT
    e.employee_name,
    w.city,
    w.state
FROM @Employees e
INNER JOIN @WorkLocations w
ON e.employee_id = w.employee_id
WHERE w.state = 'NJ';


-- checking states even if no employees are there

DECLARE @States TABLE (
    state VARCHAR(20) PRIMARY KEY
);

INSERT INTO @States (state)
VALUES
('NJ'),
('NY'),
('TX'),
('CA'),
('FL');

SELECT
    s.state,
    COUNT(w.employee_id) AS employee_count
FROM @States s
LEFT JOIN @WorkLocations w
ON s.state = w.state
GROUP BY s.state
ORDER BY s.state;