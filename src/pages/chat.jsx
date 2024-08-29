// pages/home.jsx
import React, { useState, useEffect } from "npm:react";

const HomePage = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState("Guest");
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        fetch('/api/messages')
            .then(res => res.json())
            .then(setMessages);
    }, []);

    const sendMessage = async () => {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, message: newMessage }),
        });
        const message = await response.json();
        setMessages([...messages, message]);
        setNewMessage("");
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <label className="label">User:</label>
                <input 
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="mb-4">
                <label className="label">Message:</label>
                <input 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <button 
                    onClick={sendMessage}
                    className="btn btn-primary mt-2 ml-2"
                >
                    Send
                </button>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-bold">Chat Messages</h2>
                <ul className="mt-2">
                    {messages.map(msg => (
                        <li key={msg.id} className="mb-2">
                            <span className="font-bold text-primary">{msg.user}</span>: {msg.message} <em className="text-sm text-gray-500">({new Date(msg.timestamp).toLocaleTimeString()})</em>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
