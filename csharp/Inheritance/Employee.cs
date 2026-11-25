public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }

    // setting employee values
    public Employee(int id, string name)
    {
        Id = id;
        Name = name;
    }

    // child classes can change this method
    public virtual void ShowDetails()
    {
        Console.WriteLine($"Id: {Id}");
        Console.WriteLine($"Name: {Name}");
    }
}