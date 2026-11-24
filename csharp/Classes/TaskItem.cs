// storing task details

public record TaskItem(
    int Id,
    string Title,
    string AssignedTo,
    bool Completed
);