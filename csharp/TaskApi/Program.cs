using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Models;

var builder = WebApplication.CreateBuilder(args);

// allowing react
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

// connecting sql server
builder.Services.AddDbContext<TaskDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("TaskDb")
    );
});

var app = builder.Build();

app.UseCors("ReactApp");

// getting tasks
app.MapGet("/tasks", async (bool? completed, TaskDbContext db) =>
{
    var query = db.Tasks.AsNoTracking().AsQueryable();

    if (completed.HasValue)
    {
        query = query.Where(t => t.Completed == completed.Value);
    }

    var tasks = await query.OrderBy(t => t.Id).ToListAsync();

    return Results.Ok(tasks);
});

// summary by employee
app.MapGet("/tasks/summary", async (TaskDbContext db) =>
{
    var summary = await db.Tasks
        .AsNoTracking()
        .GroupBy(t => t.AssignedTo)
        .Select(group => new
        {
            AssignedTo = group.Key,
            Count = group.Count()
        })
        .ToListAsync();

    return Results.Ok(summary);
});

// getting one task
app.MapGet("/tasks/{id:int}", async (int id, TaskDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);

    if (task == null)
        return Results.NotFound();

    return Results.Ok(task);
});

// adding task
app.MapPost("/tasks", async (TaskItem newTask, TaskDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(newTask.Title) ||
        string.IsNullOrWhiteSpace(newTask.AssignedTo))
    {
        return Results.BadRequest("Enter task and employee name");
    }

    if (newTask.Title.Length > 200 ||
        newTask.AssignedTo.Length > 100)
    {
        return Results.BadRequest("Task or employee name is too long");
    }

    // sql server generates the id
    newTask.Id = 0;

    db.Tasks.Add(newTask);
    await db.SaveChangesAsync();

    return Results.Created($"/tasks/{newTask.Id}", newTask);
});

// updating task
app.MapPut("/tasks/{id:int}", async (
    int id,
    TaskItem updatedTask,
    TaskDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);

    if (task == null)
        return Results.NotFound();

    if (string.IsNullOrWhiteSpace(updatedTask.Title) ||
        string.IsNullOrWhiteSpace(updatedTask.AssignedTo))
    {
        return Results.BadRequest("Enter task and employee name");
    }

    if (updatedTask.Title.Length > 200 ||
        updatedTask.AssignedTo.Length > 100)
    {
        return Results.BadRequest("Task or employee name is too long");
    }

    task.Title = updatedTask.Title;
    task.AssignedTo = updatedTask.AssignedTo;
    task.Completed = updatedTask.Completed;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

// completing task
app.MapPatch("/tasks/{id:int}/complete", async (
    int id,
    TaskDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);

    if (task == null)
        return Results.NotFound();

    task.Completed = true;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

// deleting task
app.MapDelete("/tasks/{id:int}", async (
    int id,
    TaskDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);

    if (task == null)
        return Results.NotFound();

    db.Tasks.Remove(task);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();
