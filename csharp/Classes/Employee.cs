public class Employee
{
    // employee details
    public int Id { get; set; }
    public string Name { get; set; }
    public string Role { get; set; }

    // setting values
    public Employee(int id, string name, string role)
    {
        Id = id;
        Name = name;
        Role = role;
    }

    // showing details
    public void ShowDetails()
    {
        Console.WriteLine($"Id: {Id}");
        Console.WriteLine($"Name: {Name}");
        Console.WriteLine($"Role: {Role}");
    }
}