import React, { useEffect } from "react";
import "./App.css";
import AddButton from "./components/AddButton";
import { StorageContext } from "./components/StorageProvider";
import TrelloItem from "./components/TrelloItem";
import { trelloData } from "./data";

const App = () => {
  const storage = React.useContext(StorageContext);
  let dataList = storage.get("list");

  useEffect(() => {
    storage.set("list", dataList || trelloData);
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h2>My Board</h2>
        <span>
          <AddButton type="list" />
        </span>
      </div>
      <div className="container">
        {dataList?.map((i) => (
          <TrelloItem title={i.title} cards={i.cards} {...i} />
        ))}
      </div>
    </div>
  );
}

export default App;
