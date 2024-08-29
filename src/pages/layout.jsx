// pages/layout.jsx

import React from "npm:react";

export default ({ children }) => (
    <>
        <header className="bg-gray-800 p-4 text-white text-center">
            <h1 className="text-3xl">GDP Data Viewer</h1>
        </header>
        <main className="min-h-screen bg-gray-100">{children}</main>
        <footer className="bg-gray-800 p-4 text-white text-center">
            <p>&copy; 2024 GDP Data Viewer</p>
        </footer>
    </>
);