// pages/layout.jsx
import React from "npm:react";

export default ({ children }) => (
    <>
        <header>
            <h1>My Blog</h1>
        </header>
        <main>{children}</main>
        <footer>© 2024 My Blog</footer>
    </>
);
