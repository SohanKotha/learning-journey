// c# lesson 1

string name = "Sohan";
int age = 26;
string college = "UT Arlington";
bool graduated = true;
decimal amount = 1500.50m;

Console.WriteLine($"Name: {name}");
Console.WriteLine($"Age: {age}");
Console.WriteLine($"College: {college}");
Console.WriteLine($"Graduated: {graduated}");
Console.WriteLine($"Amount: {amount}");

// adding skills

List<string> skills = new List<string>
{
    "JavaScript",
    "React",
    "TypeScript",
    "SQL"
};

skills.Add("C#");

Console.WriteLine($"Total Skills: {skills.Count}");

foreach (string skill in skills)
{
    Console.WriteLine(skill);
}

// storing expenses

Dictionary<string, decimal> expenses = new Dictionary<string, decimal>
{
    { "Food", 65m },
    { "Travel", 30m },
    { "Shopping", 120m }
};

foreach (var expense in expenses)
{
    Console.WriteLine($"{expense.Key}: {expense.Value}");
}

// fizzbuzz

for (int i = 1; i <= 15; i++)
{
    if (i % 3 == 0 && i % 5 == 0)
    {
        Console.WriteLine("FizzBuzz");
    }
    else if (i % 3 == 0)
    {
        Console.WriteLine("Fizz");
    }
    else if (i % 5 == 0)
    {
        Console.WriteLine("Buzz");
    }
    else
    {
        Console.WriteLine(i);
    }
}

// checking age

bool IsAdult(int personAge)
{
    return personAge >= 18;
}

Console.WriteLine($"Adult: {IsAdult(age)}");

// checking grade

string Grade(int score)
{
    if (score >= 90)
        return "A";
    else if (score >= 80)
        return "B";
    else if (score >= 70)
        return "C";
    else
        return "F";
}

Console.WriteLine($"Grade: {Grade(85)}");

// finding biggest number

int MaxOfThree(int a, int b, int c)
{
    if (a >= b && a >= c)
        return a;
    else if (b >= a && b >= c)
        return b;
    else
        return c;
}

Console.WriteLine($"Biggest: {MaxOfThree(10, 25, 15)}");
