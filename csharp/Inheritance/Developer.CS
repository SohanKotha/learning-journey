public class Developer : Employee, IWorker
{
    public string Skill { get; set; }

    // passing values to employee class
    public Developer(int id, string name, string skill)
        : base(id, name)
    {
        Skill = skill;
    }

    // changing employee method
    public override void ShowDetails()
    {
        Console.WriteLine($"Id: {Id}");
        Console.WriteLine($"Name: {Name}");
        Console.WriteLine($"Skill: {Skill}");
    }

    // doing work
    public void DoWork()
    {
        Console.WriteLine($"{Name} is working on {Skill}");
    }
}