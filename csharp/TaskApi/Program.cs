
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

// allowing react to call our api
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
        policy.WithOrigins(
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "http://localhost:5176"
        )
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("ReactApp");

// storing tasks
var tasks = new List<TaskItem>
{
    new(1, "Learn C#", "Sohan", true),
    new(2, "Build Web API", "Sohan", false)
};

// next id for new tasks
int nextId = 3;

// getting tasks
app.MapGet("/tasks", (bool? completed) =>
{
    var filtered = completed.HasValue
        ? tasks.Where(t => t.Completed == completed.Value).ToList()
        : tasks.ToList();

    return Results.Ok(filtered);
});

// grouping by employee
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

// getting task by id
app.MapGet("/tasks/{id:int}", (int id) =>
{
    var task = tasks.FirstOrDefault(t => t.Id == id);

    if (task == null)
        return Results.NotFound();

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

    // backend gives the task its id
    var savedTask = newTask with
    {
        Id = nextId++
    };

    tasks.Add(savedTask);

    return Results.Created($"/tasks/{savedTask.Id}", savedTask);
});

// updating task
app.MapPut("/tasks/{id:int}", (int id, TaskItem updatedTask) =>
{
    int index = tasks.FindIndex(t => t.Id == id);

    if (index == -1)
        return Results.NotFound();

    if (string.IsNullOrWhiteSpace(updatedTask.Title) ||
        string.IsNullOrWhiteSpace(updatedTask.AssignedTo))
    {
        return Results.BadRequest("Task and employee name are required");
    }

    tasks[index] = updatedTask with { Id = id };

    return Results.NoContent();
});

// completing task
app.MapPatch("/tasks/{id:int}/complete", (int id) =>
{
    int index = tasks.FindIndex(t => t.Id == id);

    if (index == -1)
        return Results.NotFound();

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
        return Results.NotFound();

    tasks.RemoveAt(index);

    return Results.NoContent();
});

app.Run();

// task details
record TaskItem(
    int Id,
    string Title,
    string AssignedTo,
    bool Completed
);
