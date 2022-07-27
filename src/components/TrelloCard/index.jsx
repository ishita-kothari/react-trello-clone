import React, { useEffect, useState } from "react";
import {
  getDateTime,
  shiftCardPosition,
  updateCardTitle,
} from "../../actions/updateList";
import { StorageContext } from "../StorageProvider";
import CardDetail from "./cardDetail";
import "./index.css";

const TrelloCard = ({ desc, id, listId, ...rest }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [descText, setDescText] = useState(desc);
  const storage = React.useContext(StorageContext);
  const moveToOptions = storage.get("list");
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    setDescText(desc)
  }, [desc])
  
  return (
    <>
      <div className="card-wrapper" cardId={id}>
        <div className="flexLayout">
          {isEdit ? (
            <>
              <input
                type={"text"}
                value={descText}
                onChange={(e) => setDescText(e.target.value)}
              />
              <button
                onClick={() => {
                  updateCardTitle(storage, descText, listId, id);
                  setIsEdit(false);
                }}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p
                onClick={() => setShowModal(!showModal)}
                style={{ textDecoration: "underline", color: "blue" }}
              >
                <span>{descText}</span>
                {rest.labels?.map((i) => (
                  <span className={`${i} dot`}></span>
                ))}
              </p>
              <div>
                <button onClick={() => setIsEdit(true)}>Edit</button>
                <select
                  name="moveTo"
                  value={''}
                  onChange={(e) =>{
                    shiftCardPosition(
                      storage,
                      parseInt(e.target.value),
                      id,
                      listId
                    )
                    }
                  }
                >
                  <option>Move To</option>
                  {moveToOptions
                    .filter((i) => i.id !== listId)
                    .map((i) => (
                      <option value={i.id}>{i.title}</option>
                    ))}
                </select>
              </div>
            </>
          )}
          <h6>{getDateTime(rest.updateTime)}</h6>
        </div>
        <h6>{rest.comments?.length > 0 ? rest.comments.length : 0} comments</h6>
      </div>

      {showModal && (
        <CardDetail
          desc={descText}
          onClose={closeModal}
          cardId={id}
          {...rest}
        />
      )}
    </>
  );
};

export default TrelloCard;
