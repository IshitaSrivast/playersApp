import React, { useState } from "react";
// import the necessary components
import LeftBar from "./LeftBar";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";

const Main = () => {
  const [tab, setTab] = useState(true);
  const [allPlayers, setAllPlayers] = useState([]);
  const [name, setName] = useState("My Team")
  const [edited, setEdited] = useState(false)

  return (
    <div className="main-page">
      <LeftBar tab={tab} setTab={setTab} />
      {tab ? (
        <Tab1
          allPlayers={allPlayers}
          setAllPlayers={setAllPlayers}
          name ={name}
          setName= {setName}
          named = {edited}
          setNamed = {setEdited}
       
        />
      ) : (
        <Tab2 allPlayers={allPlayers} setAllPlayers={setAllPlayers} name= {name} />
      )}
    </div>
  );
};

export default Main;
