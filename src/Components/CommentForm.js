import { useState } from "react";

const CommentForm = ({ handleSubmit, submitLabel, initialText = "" }) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="formParent">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button disabled={isTextareaDisabled}>{submitLabel}</button>
      </div>
    </form>
  );
};

export default CommentForm;
