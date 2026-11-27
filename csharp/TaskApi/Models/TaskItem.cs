namespace TaskApi.Models;

public class TaskItem
{
    // task details
    public int Id { get; set; }

    public string Title { get; set; } = "";

    public string AssignedTo { get; set; } = "";

    public bool Completed { get; set; }
}