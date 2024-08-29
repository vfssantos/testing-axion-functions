let messages = []; // In-memory message storage

export const GET = () => {
    return JSON.stringify(messages);
};

export const POST = async ({ user, message }) => {
    const newMessage = { id: messages.length + 1, user, message, timestamp: new Date() };
    messages.push(newMessage);
    return JSON.stringify(newMessage);
};