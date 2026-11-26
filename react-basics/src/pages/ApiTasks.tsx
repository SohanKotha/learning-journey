
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import {
    getTasks,
    createTask,
    completeTask,
    deleteTask
} from "../api/tasks";

import type { TaskItem } from "../api/tasks";

function ApiTasks() {

    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [title, setTitle] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [workingId, setWorkingId] = useState<number | null>(null);
    const [error, setError] = useState("");

    // getting tasks from c#
    useEffect(() => {
        let active = true;

        const loadTasks = async () => {
            try {
                const data = await getTasks();

                if (active) {
                    setTasks(data);
                    setError("");
                }
            } catch (err) {
                if (active) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Could not load tasks"
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadTasks();

        return () => {
            active = false;
        };
    }, []);

    // adding task to backend
    const addTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim() || !assignedTo.trim()) {
            setError("Enter task name and employee name");
            return;
        }

        setSaving(true);
        setError("");

        try {
            const newTask: TaskItem = {
                id: 0, // c# will generate the actual id
                title: title.trim(),
                assignedTo: assignedTo.trim(),
                completed: false
            };

            const savedTask = await createTask(newTask);

            setTasks((current) => [...current, savedTask]);

            setTitle("");
            setAssignedTo("");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not add task"
            );
        } finally {
            setSaving(false);
        }
    };

    // marking completed
    const markCompleted = async (id: number) => {
        setWorkingId(id);
        setError("");

        try {
            await completeTask(id);

            setTasks((current) =>
                current.map((task) =>
                    task.id === id
                        ? { ...task, completed: true }
                        : task
                )
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not complete task"
            );
        } finally {
            setWorkingId(null);
        }
    };

    // deleting task
    const removeTask = async (id: number) => {
        setWorkingId(id);
        setError("");

        try {
            await deleteTask(id);

            setTasks((current) =>
                current.filter((task) => task.id !== id)
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Could not delete task"
            );
        } finally {
            setWorkingId(null);
        }
    };

    const completedCount = tasks.filter(
        (task) => task.completed
    ).length;

    return (
        <div>

            <h2>Employee Tasks - C# API</h2>

            <p>These tasks are coming from our ASP.NET Core API.</p>

            <form onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Task name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Employee name"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                />

                <button type="submit" disabled={saving}>
                    {saving ? "Adding..." : "Add Task"}
                </button>
            </form>

            {error && (
                <p role="alert" style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <hr />

            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <div>

                    <h3>Total Tasks: {tasks.length}</h3>

                    <p>Completed: {completedCount}</p>

                    <p>Pending: {tasks.length - completedCount}</p>

                    {tasks.length === 0 && !error && (
                        <p>No tasks found</p>
                    )}

                    {tasks.map((task) => (
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
                                    textDecoration: task.completed
                                        ? "line-through"
                                        : "none"
                                }}
                            >
                                {task.title}
                            </h3>

                            <p>Assigned to: {task.assignedTo}</p>

                            <p>
                                Status: {task.completed
                                    ? "Completed"
                                    : "Pending"}
                            </p>

                            <button
                                onClick={() => markCompleted(task.id)}
                                disabled={
                                    task.completed || workingId !== null
                                }
                            >
                                {task.completed
                                    ? "Completed"
                                    : "Mark Completed"}
                            </button>

                            <button
                                onClick={() => removeTask(task.id)}
                                disabled={workingId !== null}
                            >
                                Delete
                            </button>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default ApiTasks;
