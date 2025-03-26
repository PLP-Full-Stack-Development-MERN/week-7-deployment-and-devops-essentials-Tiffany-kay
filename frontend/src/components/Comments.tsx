import { useState, useContext } from "react";
import { BlogContext } from "../context/BlogContext";

interface CommentsProps {
    blogId: string;
}

const Comments = ({ blogId }: CommentsProps) => {
    const { comments, addComment } = useContext(BlogContext)!;
    const [content, setContent] = useState("");

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addComment(blogId, content);
        setContent("");
    };

    return (
        <div>
            <h3>Comments</h3>
            {comments.filter((c) => c.blogId === blogId).map((comment) => (
                <div key={comment._id} className="comment">
                    <p><strong>{comment.user}:</strong> {comment.content}</p>
                </div>
            ))}

            <form onSubmit={handleCommentSubmit}>
                <textarea placeholder="Write a comment..." value={content} onChange={(e) => setContent(e.target.value)} />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default Comments;
