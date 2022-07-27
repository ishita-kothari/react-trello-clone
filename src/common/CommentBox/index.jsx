import React, { useState } from "react";

const CommentBox = ({ value, handleCommentSubmit }) => {
  const [comment, setComment] = useState();
  return (
    <div className="flexLayout">
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button
        onClick={() => {
          setComment("");

          handleCommentSubmit(comment);
        }}
      >
        save
      </button>
    </div>
  );
};

export default CommentBox;
