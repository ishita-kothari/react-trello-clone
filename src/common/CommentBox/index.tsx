import React, { useState } from "react";

type CommentBoxProps = {
  handleCommentSubmit: (value: string) => void 
}


const CommentBox = ({ handleCommentSubmit }: CommentBoxProps) => {
  const [comment, setComment] = useState<string | ''>('');
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
