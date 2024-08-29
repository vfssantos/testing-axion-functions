// api/posts.ts
let posts = [];

const createPost = (props) => {

    const newPost = {
        id: props.uuid,
        title: props.title || "Untitled",
        content: props.content || "No content",
    };
    posts.push(newPost);
    return newPost;
};

export const GET = () => posts;

export const POST = (props) => {
    const { uuid } = POST;
    const post = createPost({ props, uuid: uuid() });
    return post;
};