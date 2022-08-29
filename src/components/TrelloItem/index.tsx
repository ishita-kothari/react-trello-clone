import React from "react";
import { getDateTime, sortCards } from "../../actions/updateList";
import AddButton from "../AddButton";
// import { StorageContext } from "../StorageProvider";
import TrelloCard from "../TrelloCard";
import "./index.css";

type TrelloItemProp = {
  title: string,
  cards: {
    id: number,
    desc: string,
    comments: string[],
    labels: string[],
  }[],
  [x:string]: any
};
const TrelloItem = ({ title, cards, ...rest }: TrelloItemProp) => {
  // const storage = React.useContext(StorageContext);
  const handleSorting = (value: string) => {
    // sortCards(storage, value, rest.id);
  };
  return (
    <>
      <div className="item-wrapper">
        <div className="flexLayout">
          <h3 className="title">{title}</h3>
          <div>
            <select onChange={(e) => handleSorting(e.target.value)}>
              <option>Sort</option>
              <option value="asc">Newest First</option>
              <option value="desc">Oldest First</option>
            </select>
            <h6>{getDateTime(rest.updateTime)}</h6>
          </div>
        </div>

        {cards.map((c) => (
          <TrelloCard description={c.desc} cardid={c.id} listId={rest.id} {...c} />
        ))}

        <AddButton listId={rest.id} />
      </div>
    </>
  );
};

export default TrelloItem;
