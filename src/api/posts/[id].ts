import { GET as postsFn } from './main.ts';
// api/[id].ts
export const GET = (props) => {
    const posts = postsFn();
    const _post = posts.find((p) => p.id === props.id);
    if (!_post) {
        throw { message: "Post not found", status: 404 };
    }
    return _post;
};
