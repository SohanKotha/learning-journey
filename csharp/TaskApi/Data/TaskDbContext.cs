using Microsoft.EntityFrameworkCore;
using TaskApi.Models;

namespace TaskApi.Data;

public class TaskDbContext : DbContext
{
    // database connection
    public TaskDbContext(DbContextOptions<TaskDbContext> options)
        : base(options)
    {
    }

    // tasks table
    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.HasKey(t => t.Id);

            entity.Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(t => t.AssignedTo)
                .IsRequired()
                .HasMaxLength(100);
        });
    }
}