import React, { useContext, useState, useEffect } from "react";
import LeftBar from "./LeftBar";
import "./pages.scss";
import field from "../assets/soccer-field.png";
import warn from "../assets/warn.png";

const Tab2 = (props) => {
  const [popup, setPopup] = useState(true);

  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [def, setDef] = useState([]);
  const [forw, setForw] = useState([]);
  const [golk, setGolk] = useState([]);
  const [midf, setMidf] = useState([]);

  const [current, setCurrent] = useState(0);

  const [starters, setStarters] = useState([]);

  useEffect(() => {
    if (props.allPlayers.length === 0) {
      setMessage1("No players in the list.");
      setMessage2("Please add players to the list.");
    } else {
      const counts = { goalkeeper: 0, midfielder: 0, defender: 0, forward: 0 };
      const allStarters = [];

      props.allPlayers.forEach((player) => {
        if (player[8].toLowerCase() === "yes") {
          const role = player[3].toLowerCase();
          if (
            ["goalkeeper", "midfielder", "defender", "forward"].includes(role)
          ) {
            counts[role]++;
            allStarters.push({
              ...player,
              role,
            });
          }
        }
      });

      console.log(counts);

      if (
        counts.goalkeeper < 1 ||
        counts.midfielder < 3 ||
        counts.defender < 4 ||
        counts.forward < 3
      ) {
        setMessage1("Not enough starters");
        setMessage2(
          "Your team doesn’t have enough starters  for one or more of the positions in the 4-3-3 formation"
        );
      } else if (
        counts.goalkeeper > 1 ||
        counts.midfielder > 3 ||
        counts.defender > 4 ||
        counts.forward > 3
      ) {
        setMessage1("There are too many starters.");
        setMessage2(
          "Your team has too many starters for one or more of the positions in the 4-3-3 formation."
        );
      } else {
        setPopup(false);
      }

      // Sort allStarters based on the desired order (goalkeeper, defender, midfielder, forward)
      allStarters.sort((a, b) => {
        const order = ["goalkeeper", "defender", "midfielder", "forward"];
        return order.indexOf(a.role) - order.indexOf(b.role);
      });

      // Set starters list in state
      setStarters(allStarters);
    }
  }, [props.allPlayers]);

  let top = [
    "47%",
    "33%",
    "10%",
    "63%",
    "85%",
    "47%",
    "75%",
    "20%",
    "26%",
    "47%",
    "67%",
    "87%",
  ];
  let left = [
    "3%",
    "21%",
    "24%",
    "21%",
    "24%",
    "44%",
    "43%",
    "44%",
    "65%",
    "70%",
    "65%",
    "70%",
  ];

  return (
    <div className="tab-page1">
      {popup && (
        <div className="overlay">
          <div className="center-box-2">
            <div className="top-message">
              <img src={warn}></img>
              {message1}
            </div>

            <div className="top-message-2">{message2}</div>
          </div>{" "}
        </div>
      )}
      <div className="top-bar">
        <div className="top-left">
          <div className="upper-data">Formation Overview</div>
          <div className="lower-data">{props.name}</div>
        </div>
      </div>
      <div className="bottom-page-tab-2">
        <div className="ground">
          <img src={field}></img>

          {!popup && (
            <>
              {starters.map((player, index) => (
                <div
                  key={index}
                  className="player-point"
                  style={{ top: `${top[index]}`, left: `${left[index]}` }}
                  onClick={() => {
                    setCurrent(index);
                  }}
                >
                  <div className= {index === current ? "pont active" : "pont"}>
                    {starters[index][2]}
                  </div>
                  <div className="name">{starters[index][0]}</div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="rght-info">
          <div className="upper-px">
            {!popup && (
              <>
                <div className="upper-image">
                  <img
                    src={
                      starters[current][1]
                      //"https://www.psg.fr/media/187967/cards-23-24_letellier-alt.png?center=0.5,0.5&mode=crop&width=400&height=600&quality=75"
                    }
                    alt={`Player ${starters[current][0]} Image`}
                  />
                  <div className="jersey-num">{starters[current][2]}</div>
                  <div className="player-det">
                    <div className="name">{starters[current][0]}</div>
                    <div className="role">{starters[current][3]}</div>
                  </div>
                </div>

                <div className="lower-image">
                  <div className="lower-box">
                    <div className="uper">Weight</div>
                    <div className="lower"> {starters[current][4]} </div>
                  </div>
                  <div className="lower-box">
                    <div className="uper">Height</div>
                    <div className="lower"> {starters[current][5]} </div>
                  </div>
                  <div className="lower-box coutry">
                    <div className="uper">Nationality</div>
                    <div className="lower">
                      <img src={starters[current][7]}></img>
                      {starters[current][6]}{" "}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="border-line"></div>

          {!popup && (
            <>
              {" "}
              <div className="lower-px">
                <div className="left">
                  <div className="uppr">{starters[current][9]}</div>
                  <div className="lower">Appearances</div>
                </div>

                <div className="left">
                  <div className="uppr">{starters[current][10]}</div>
                  <div className="lower">Minutes Played</div>
                </div>
              </div>
              <div className="lower-px">
                <div className="left">
                  <div className="uppr">
                    {current === 0
                      ? starters[current][13]
                      : starters[current][11]}
                  </div>
                  <div className="lower">
                    {current === 0 ? "Clean Sheets" : "Goals"}
                  </div>
                </div>

                <div className="left">
                  <div className="uppr">
                    {current === 0
                      ? starters[current][14]
                      : starters[current][12]}
                  </div>
                  <div className="lower">
                    {current === 0 ? "Saves" : "Assists"}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tab2;