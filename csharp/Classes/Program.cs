// c# lesson 2

Console.WriteLine("Employee Details");

// creating employees

Employee employee1 = new Employee(1, "Rikshith", "Developer");
Employee employee2 = new Employee(2, "Bhavana", "Tester");

employee1.ShowDetails();
Console.WriteLine();

employee2.ShowDetails();
Console.WriteLine();

// changing employee role

employee1.Role = "Senior Developer";

Console.WriteLine("After updating role:");
employee1.ShowDetails();

// storing employees in list

List<Employee> employees = new List<Employee>
{
    employee1,
    employee2,
    new Employee(3, "Sreeram", "Developer")
};

Console.WriteLine();
Console.WriteLine("All Employees");

foreach (var employee in employees)
{
    Console.WriteLine($"{employee.Name} - {employee.Role}");
}

// creating task using record

Console.WriteLine();
Console.WriteLine("Task Details");

TaskItem task1 = new TaskItem(
    101,
    "Check login page",
    "Rikshith",
    false
);

Console.WriteLine($"Task: {task1.Title}");
Console.WriteLine($"Assigned To: {task1.AssignedTo}");
Console.WriteLine($"Completed: {task1.Completed}");

// updating task status

TaskItem updatedTask = task1 with
{
    Completed = true
};

Console.WriteLine();
Console.WriteLine("After completing task:");

Console.WriteLine($"Old Status: {task1.Completed}");
Console.WriteLine($"New Status: {updatedTask.Completed}");

// comparing records

TaskItem task2 = new TaskItem(
    101,
    "Check login page",
    "Rikshith",
    false
);

Console.WriteLine();
Console.WriteLine($"Same task details: {task1 == task2}");