
 // c# lesson 4 linq practice

using System.Linq;

// adding tasks

List<TaskItem> tasks = new List<TaskItem>
{
    new TaskItem(1, "Fix login page", "Rikshith", 5, false),
    new TaskItem(2, "Test API", "Bhavana", 3, true),
    new TaskItem(3, "Create dashboard", "Sreeram", 8, false),
    new TaskItem(4, "Update database", "Rikshith", 4, true),
    new TaskItem(5, "Check user form", "Bhavana", 2, false),
    new TaskItem(6, "Fix React bug", "Sreeram", 6, true)
};


// getting pending tasks

Console.WriteLine("Pending Tasks");

var pendingTasks = tasks.Where(task => !task.Completed);

foreach (var task in pendingTasks)
{
    Console.WriteLine(task.Title);
}


// getting only task names

Console.WriteLine();
Console.WriteLine("Task Names");

var taskNames = tasks.Select(task => task.Title);

foreach (var name in taskNames)
{
    Console.WriteLine(name);
}


// sorting by hours

Console.WriteLine();
Console.WriteLine("Tasks Sorted By Hours");

var sortedTasks = tasks.OrderBy(task => task.Hours);

foreach (var task in sortedTasks)
{
    Console.WriteLine($"{task.Title} - {task.Hours} hours");
}


// counting completed tasks

Console.WriteLine();
Console.WriteLine("Task Count");

int completedCount = tasks.Count(task => task.Completed);

Console.WriteLine($"Completed: {completedCount}");
Console.WriteLine($"Total: {tasks.Count}");


// calculating hours

Console.WriteLine();
Console.WriteLine("Total Hours");

int totalHours = tasks.Sum(task => task.Hours);

Console.WriteLine($"Hours: {totalHours}");


// checking if any task takes more than 7 hours

bool hasLongTask = tasks.Any(task => task.Hours > 7);

Console.WriteLine($"Any long task: {hasLongTask}");


// finding a task

Console.WriteLine();
Console.WriteLine("Finding Task");

var foundTask = tasks.FirstOrDefault(task => task.Id == 3);

if (foundTask != null)
{
    Console.WriteLine($"Found: {foundTask.Title}");
}


// grouping tasks by employee

Console.WriteLine();
Console.WriteLine("Tasks By Employee");

var groupedTasks = tasks.GroupBy(task => task.AssignedTo);

foreach (var group in groupedTasks)
{
    Console.WriteLine($"{group.Key}: {group.Count()} tasks");

    foreach (var task in group)
    {
        Console.WriteLine($"  {task.Title}");
    }
}


// storing task data

public record TaskItem(
    int Id,
    string Title,
    string AssignedTo,
    int Hours,
    bool Completed
);
