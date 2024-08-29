// pages/[id].jsx
import React, { useState, useEffect } from "npm:react";

const PostPage = (props) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`/api/${props.id}`)
            .then((res) => res.json())
            .then((data) => setPost(data));
    }, [props.id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default PostPage;
