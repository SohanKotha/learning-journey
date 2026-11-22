import { useState } from "react";
import type { FormEvent } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface Task {
    id: number;
    title: string;
    assignedTo: string;
    completed: boolean;
}

const initialTasks: Task[] = [
    {
        id: 1,
        title: "Check login page",
        assignedTo: "Rikshith",
        completed: false
    },
    {
        id: 2,
        title: "Update user details",
        assignedTo: "Bhavana",
        completed: true
    },
    {
        id: 3,
        title: "Test expense form",
        assignedTo: "Sreeram",
        completed: false
    }
];

function TaskManager() {

    const [tasks, setTasks] = useLocalStorage<Task[]>(
        "employee-tasks",
        initialTasks
    );

    const [title, setTitle] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [filter, setFilter] = useState("All");

    // adding a task
    const addTask = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (title.trim() === "" || assignedTo.trim() === "") {
            alert("Please enter task name and employee name");
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            title: title.trim(),
            assignedTo: assignedTo.trim(),
            completed: false
        };

        setTasks((current) => [...current, newTask]);

        setTitle("");
        setAssignedTo("");
        setFilter("All");
    };

    // changing task status
    const toggleTask = (id: number) => {

        setTasks((current) =>
            current.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    // removing task
    const deleteTask = (id: number) => {

        setTasks((current) =>
            current.filter((task) => task.id !== id)
        );
    };

    const filteredTasks = tasks.filter((task) => {

        if (filter === "Pending") {
            return !task.completed;
        }

        if (filter === "Completed") {
            return task.completed;
        }

        return true;
    });

    const completedCount = tasks.filter(
        (task) => task.completed
    ).length;

    return (
        <div>

            <h2>Employee Task Manager</h2>

            <p>Adding and managing employee tasks</p>

            <form onSubmit={addTask}>

                <div>
                    <input
                        type="text"
                        placeholder="Enter task name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <input
                        type="text"
                        placeholder="Assigned employee"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Add Task
                </button>

            </form>

            <hr />

            <h3>Total Tasks: {tasks.length}</h3>

            <p>Completed: {completedCount}</p>

            <p>Pending: {tasks.length - completedCount}</p>

            <div>

                {["All", "Pending", "Completed"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        style={{
                            backgroundColor:
                                filter === status ? "lightblue" : "white"
                        }}
                    >
                        {status}
                    </button>
                ))}

            </div>

            <h3>Task List</h3>

            {filteredTasks.length === 0 ? (

                <p>No tasks found</p>

            ) : (

                filteredTasks.map((task) => (

                    <div
                        key={task.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "12px",
                            margin: "12px auto",
                            maxWidth: "480px"
                        }}
                    >

                        <h3
                            style={{
                                textDecoration:
                                    task.completed ? "line-through" : "none"
                            }}
                        >
                            {task.title}
                        </h3>

                        <p>Assigned to: {task.assignedTo}</p>

                        <p>
                            Status: {task.completed ? "Completed" : "Pending"}
                        </p>

                        <button onClick={() => toggleTask(task.id)}>
                            {task.completed
                                ? "Mark Pending"
                                : "Mark Completed"}
                        </button>

                        <button onClick={() => deleteTask(task.id)}>
                            Delete
                        </button>

                    </div>

                ))

            )}

        </div>
    );
}

export default TaskManager;