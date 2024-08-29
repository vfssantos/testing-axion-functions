// pages/index.jsx
import React, { useState, useEffect } from "npm:react";

const IndexPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <a href={`/pages/${post.id}`}>{post.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IndexPage;
