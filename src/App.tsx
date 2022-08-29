import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { StorageContext } from "./components/StorageProvider";
import TrelloItem from "./components/TrelloItem";

// import AddButton from "./components/AddButton";
// import { StorageContext } from "./components/StorageProvider";
// import TrelloItem from "./components/TrelloItem";
// import { trelloData } from "./data";

const App = () => {
  const storage = React.useContext(StorageContext);
  let dataList = storage.get("list");

  useEffect(() => {
    storage.set("list", dataList || []);
  }, []);
  return (
    <div className="App">
      <Header />
      <div className="container">
        {dataList?.map((i) => (
          <TrelloItem cardtitle={i.title} cardsList={i.cards} {...i} />
        ))}
      </div>
 
    </div>
  );
}

export default App;
