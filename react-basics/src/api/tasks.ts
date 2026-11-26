
const API_URL = "http://localhost:5050";

// same task fields as c#
export interface TaskItem {
    id: number;
    title: string;
    assignedTo: string;
    completed: boolean;
}

// getting all tasks
export async function getTasks(): Promise<TaskItem[]> {
    const response = await fetch(`${API_URL}/tasks`);

    if (!response.ok) {
        throw new Error("Failed to load tasks: " + response.status);
    }

    return response.json();
}

// adding task
export async function createTask(task: TaskItem): Promise<TaskItem> {
    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    if (!response.ok) {
        throw new Error("Failed to add task: " + response.status);
    }

    return response.json();
}

// completing task
export async function completeTask(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}/complete`, {
        method: "PATCH"
    });

    if (!response.ok) {
        throw new Error("Failed to complete task: " + response.status);
    }
}

// deleting task
export async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete task: " + response.status);
    }
}
