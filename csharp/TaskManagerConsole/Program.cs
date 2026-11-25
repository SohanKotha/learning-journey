
using System;
using System.Collections.Generic;
using System.Linq;

// c# console task manager

List<TaskItem> tasks = new List<TaskItem>
{
    new TaskItem(1, "Fix login page", "Rikshith", false),
    new TaskItem(2, "Test API", "Bhavana", true),
    new TaskItem(3, "Update database", "Sreeram", false)
};

int nextId = 4;


// adding a task
void AddTask()
{
    Console.Write("Enter task name: ");
    string title = Console.ReadLine() ?? "";

    Console.Write("Assigned employee: ");
    string employee = Console.ReadLine() ?? "";

    if (string.IsNullOrWhiteSpace(title) ||
        string.IsNullOrWhiteSpace(employee))
    {
        Console.WriteLine("Please enter both details");
        return;
    }

    TaskItem newTask = new TaskItem(
        nextId,
        title.Trim(),
        employee.Trim(),
        false
    );

    tasks.Add(newTask);
    nextId++;

    Console.WriteLine("Task added");
}


// showing tasks
void ShowTasks(string filter = "All")
{
    var filtered = tasks.Where(task =>
        filter == "All" ||
        (filter == "Pending" && !task.Completed) ||
        (filter == "Completed" && task.Completed)
    ).ToList();

    if (filtered.Count == 0)
    {
        Console.WriteLine("No tasks found");
        return;
    }

    foreach (var task in filtered)
    {
        string status = task.Completed ? "Completed" : "Pending";

        Console.WriteLine(
            $"{task.Id}. {task.Title} - {task.AssignedTo} - {status}"
        );
    }
}


// changing task status
void ChangeStatus()
{
    Console.Write("Enter task ID: ");
    string input = Console.ReadLine() ?? "";

    if (!int.TryParse(input, out int id))
    {
        Console.WriteLine("Invalid task ID");
        return;
    }

    int index = tasks.FindIndex(task => task.Id == id);

    if (index == -1)
    {
        Console.WriteLine("Task not found");
        return;
    }

    tasks[index] = tasks[index] with
    {
        Completed = !tasks[index].Completed
    };

    Console.WriteLine("Task status updated");
}


// deleting task
void DeleteTask()
{
    Console.Write("Enter task ID to delete: ");
    string input = Console.ReadLine() ?? "";

    if (!int.TryParse(input, out int id))
    {
        Console.WriteLine("Invalid task ID");
        return;
    }

    int removed = tasks.RemoveAll(task => task.Id == id);

    if (removed > 0)
    {
        Console.WriteLine("Task deleted");
    }
    else
    {
        Console.WriteLine("Task not found");
    }
}


// main menu
while (true)
{
    Console.WriteLine();
    Console.WriteLine("Employee Task Manager");
    Console.WriteLine("1. Add Task");
    Console.WriteLine("2. View All Tasks");
    Console.WriteLine("3. Change Task Status");
    Console.WriteLine("4. Delete Task");
    Console.WriteLine("5. View Pending Tasks");
    Console.WriteLine("6. View Completed Tasks");
    Console.WriteLine("0. Exit");

    Console.Write("Choose option: ");

    string choice = Console.ReadLine() ?? "";

    Console.WriteLine();

    switch (choice)
    {
        case "1":
            AddTask();
            break;

        case "2":
            ShowTasks();
            break;

        case "3":
            ChangeStatus();
            break;

        case "4":
            DeleteTask();
            break;

        case "5":
            ShowTasks("Pending");
            break;

        case "6":
            ShowTasks("Completed");
            break;

        case "0":
            Console.WriteLine("Goodbye!");
            return;

        default:
            Console.WriteLine("Invalid option");
            break;
    }
}
