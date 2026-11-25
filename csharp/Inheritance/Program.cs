// c# lesson 3

Console.WriteLine("Inheritance Practice");

// creating employees

Employee employee1 = new Employee(1, "Bhavana");

Developer developer1 = new Developer(2, "Rikshith", "C#");
Developer developer2 = new Developer(3, "Sreeram", "React");

Console.WriteLine();
Console.WriteLine("Employee Details");

employee1.ShowDetails();

Console.WriteLine();
Console.WriteLine("Developer Details");

developer1.ShowDetails();

Console.WriteLine();

developer2.ShowDetails();


// calling work method

Console.WriteLine();
Console.WriteLine("Work Details");

developer1.DoWork();
developer2.DoWork();


// storing all employees

Console.WriteLine();
Console.WriteLine("All Team Members");

List<Employee> team = new List<Employee>
{
    employee1,
    developer1,
    developer2
};

foreach (var member in team)
{
    member.ShowDetails();
    Console.WriteLine();
}


// checking worker interface

Console.WriteLine("Checking Worker Interface");

foreach (var member in team)
{
    if (member is IWorker worker)
    {
        worker.DoWork();
    }
    else
    {
        Console.WriteLine($"{member.Name} has no work method");
    }
}


// task status using dictionary

Console.WriteLine();
Console.WriteLine("Task Status");

Dictionary<int, string> taskStatus = new Dictionary<int, string>
{
    { 1, "Pending" },
    { 2, "Completed" },
    { 3, "In Progress" }
};

foreach (var task in taskStatus)
{
    Console.WriteLine($"Employee {task.Key}: {task.Value}");
}