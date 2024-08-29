// api/tasks.ts
const tasks = [];

export const GET = (props) => {
    const { id } = props;
    if (id) {
        const task = tasks.find((t) => t.id === id);
        if (!task) throw { message: "Task not found", status: 404 };
        return task;
    }
    return tasks;
};

export const POST = (props) => {
    const { title } = props;
    if (!title) throw { message: "Title is required", status: 400 };

    const newTask = {
        id: crypto.randomUUID(),
        title,
        completed: false,
    };
    tasks.push(newTask);
    return newTask;
};

export const DELETE = (props) => {
    const { id } = props;
    console.log(tasks)
    tasks.splice(tasks.findIndex((t) => t.id === id), 1);
    return { message: "Task deleted successfully" };
};

export const PUT = (props) => {
    const { id, title, completed } = props;
    const task = tasks.find((t) => t.id === id);
    if (!task) throw { message: "Task not found", status: 404 };

    task.title = title !== undefined ? title : task.title;
    task.completed = completed !== undefined ? completed : task.completed;
    return task;
};
