
using System.Linq;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// adding some tasks
var tasks = new List<TaskItem>
{
    new(1, "Learn C#", "Sohan", true),
    new(2, "Build Web API", "Sohan", false)
};

// getting all tasks and filtering
app.MapGet("/tasks", (bool? completed) =>
{
    var filtered = completed.HasValue
        ? tasks.Where(t => t.Completed == completed.Value).ToList()
        : tasks.ToList();

    return Results.Ok(filtered);
});

// counting tasks by employee
app.MapGet("/tasks/summary", () =>
{
    var summary = tasks
        .GroupBy(t => t.AssignedTo)
        .Select(group => new
        {
            AssignedTo = group.Key,
            Count = group.Count()
        })
        .ToList();

    return Results.Ok(summary);
});

// getting one task
app.MapGet("/tasks/{id:int}", (int id) =>
{
    var task = tasks.FirstOrDefault(t => t.Id == id);

    if (task == null)
    {
        return Results.NotFound();
    }

    return Results.Ok(task);
});

// adding task
app.MapPost("/tasks", (TaskItem newTask) =>
{
    if (string.IsNullOrWhiteSpace(newTask.Title) ||
        string.IsNullOrWhiteSpace(newTask.AssignedTo))
    {
        return Results.BadRequest("Task and employee name are required");
    }

    if (newTask.Id <= 0 || tasks.Any(t => t.Id == newTask.Id))
    {
        return Results.BadRequest("Enter a valid and unique task ID");
    }

    tasks.Add(newTask);

    return Results.Created($"/tasks/{newTask.Id}", newTask);
});

// updating task
app.MapPut("/tasks/{id:int}", (int id, TaskItem updatedTask) =>
{
    int index = tasks.FindIndex(t => t.Id == id);

    if (index == -1)
    {
        return Results.NotFound();
    }

    if (string.IsNullOrWhiteSpace(updatedTask.Title) ||
        string.IsNullOrWhiteSpace(updatedTask.AssignedTo))
    {
        return Results.BadRequest("Task and employee name are required");
    }

    // keeping the id from the url
    tasks[index] = updatedTask with { Id = id };

    return Results.NoContent();
});

// marking task completed
app.MapPatch("/tasks/{id:int}/complete", (int id) =>
{
    int index = tasks.FindIndex(t => t.Id == id);

    if (index == -1)
    {
        return Results.NotFound();
    }

    tasks[index] = tasks[index] with
    {
        Completed = true
    };

    return Results.NoContent();
});

// deleting task
app.MapDelete("/tasks/{id:int}", (int id) =>
{
    int index = tasks.FindIndex(t => t.Id == id);

    if (index == -1)
    {
        return Results.NotFound();
    }

    tasks.RemoveAt(index);

    return Results.NoContent();
});

app.Run();

// storing task details
record TaskItem(
    int Id,
    string Title,
    string AssignedTo,
    bool Completed
);
