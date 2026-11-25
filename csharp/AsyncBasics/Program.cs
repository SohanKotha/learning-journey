
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// c# lesson 5

Console.WriteLine("Exception Handling Practice");

// trying invalid number

try
{
    string input = "twenty";

    int age = int.Parse(input);

    Console.WriteLine($"Age: {age}");
}
catch (FormatException)
{
    Console.WriteLine("Invalid number entered");
}
finally
{
    Console.WriteLine("Finished checking number");
}


// safe way to convert numbers

Console.WriteLine();
Console.WriteLine("TryParse Practice");

string marks = "85";

if (int.TryParse(marks, out int score))
{
    Console.WriteLine($"Marks: {score}");
}
else
{
    Console.WriteLine("Marks should be a number");
}


// async await practice

Console.WriteLine();
Console.WriteLine("Loading Tasks");

List<string> tasks = await GetTasksAsync();

foreach (string task in tasks)
{
    Console.WriteLine(task);
}

Console.WriteLine("All tasks loaded");


// method returning tasks

async Task<List<string>> GetTasksAsync()
{
    Console.WriteLine("Getting task data...");

    // waiting 1 second like an api call
    await Task.Delay(1000);

    return new List<string>
    {
        "Fix login page",
        "Test API",
        "Update database"
    };
}
