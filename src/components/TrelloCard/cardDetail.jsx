import React from "react";
import { addComments, addLabel, removeLabel } from "../../actions/updateList";
import CommentBox from "../../common/CommentBox";
import { StorageContext } from "../StorageProvider";

const CardDetail = ({ desc, onClose, cardId, ...rest }) => {
  const storage = React.useContext(StorageContext);
  const handleCommentSubmit = (value) => {
    addComments(value, cardId, storage);
  };
  const handleLabelChange = (value) => {
    if(rest.labels?.includes(value)){
      removeLabel(value, cardId, storage);
    } else {
      addLabel(value, cardId, storage);
    }
  };
  return (
    <div className="card-detail-wrapper">
      <div className="flexLayout">
        <h4>{desc}</h4>
        <button onClick={onClose}>X</button>
      </div>
      <hr />
      <CommentBox cardId={cardId} handleCommentSubmit={handleCommentSubmit} />
      <h6>Comments:</h6>
      {rest.comments?.map((i, k) => (
        <p>
          comment {k + 1}: {i}
        </p>
      ))}
      <hr />
      <h6>Add a Label</h6>
      <div>
        <input
          type="checkbox"
          id="important"
          name="red"
          value="red"
          onChange={(e) => handleLabelChange(e.target.value)}
          checked={rest.labels?.includes('red')}
        />
        <label for="red"> Important</label>
        <br />
        <input
          type="checkbox"
          id="info"
          name="blue"
          value="blue"
          onChange={(e) => handleLabelChange(e.target.value)}
          checked={rest.labels?.includes('blue')}
        />
        <label for="blue"> Informative / Low Priority</label>
        <br />
      </div>
    </div>
  );
};

export default CardDetail;
