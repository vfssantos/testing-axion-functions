// pages/home.jsx
import React, { useState, useEffect } from "npm:react";

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
    };

    const addTask = async () => {
        if (!newTaskTitle) return;
        await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTaskTitle }),
        });
        setNewTaskTitle("");
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await fetch(`/api/tasks?id=${id}`, {
            method: "DELETE",
        });
        fetchTasks();
    };

    const toggleTaskCompletion = async (id, completed) => {
        await fetch(`/api/tasks?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !completed }),
        });
        fetchTasks();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
            <div className="flex mb-4">
                <input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="New task title"
                    className="input input-bordered w-full max-w-xs mr-2"
                />
                <button onClick={addTask} className="btn btn-primary">
                    Add Task
                </button>
            </div>
            <ul className="list-disc pl-5">
                {tasks.map((task) => (
                    <li key={task.id} className="mb-2 flex items-center">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id, task.completed)}
                            className="checkbox checkbox-primary mr-2"
                        />
                        <span className={`flex-1 ${task.completed ? "line-through" : ""}`}>
                            {task.title}
                        </span>
                        <button onClick={() => deleteTask(task.id)} className="btn btn-error btn-sm">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
