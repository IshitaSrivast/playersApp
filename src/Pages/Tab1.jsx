import React, { useState, useEffect } from "react";
import "./pages.scss";
import close from "../assets/close.png";
import pen from "../assets/pen.png";
import pen2 from "../assets/pen.png";
import trash from "../assets/trash.png";
import glass from "../assets/glass.png";

const Tab1 = (props) => {
  const [popup, setPopup] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [message, setMessage] = useState("File must be in .csv format");
  const [fileName, setFileName] = useState("");

  const [gk, setGk] = useState(0);
  const [fr, setFr] = useState(0);
  const [mf, setMf] = useState(0);
  const [def, setDef] = useState(0);
  const [totalPlay, setTotalPlay] = useState(0);

  const [fileAcc, setFileAcc] = useState(false);
  const [listPlayers, setListPlayers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editableItem, setEditableItem] = useState({});
  const [acti, setActi] = useState(false);
  const [current, setCurrent] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [deletePop, setDeletePop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const [error, setError] = useState(false);

  const itemsPerPage = 16; // Adjust as needed

  const [isEditing, setIsEditing] = useState(true);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      props.setNamed(true);
      console.log("okay");
    }
  };

  useEffect(() => {
    if (!search) {
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setCurrentItems(
        props.allPlayers.slice(indexOfFirstItem, indexOfLastItem)
      );
      //console.log(currentItems);
    }
  }, [currentPage, props.allPlayers, search]);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleDotsClick = (item, key) => {
    setShowPopup(true);
  };

  const handleRadioChange = (value) => {
    handleInputChange(8, value);
  };

  const handleSearch = () => {
    // Filter players whose 0th index value includes the search term
    const results = props.allPlayers.filter(
      (player) =>
        player[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
        player[3].toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(results);
    setCurrentItems(results);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearch(true);
      handleSearch();
    } else if (event.key === "Escape") {
      // Reset search
      setSearchTerm("");
      setSearch(false);
    }
  };

  const handleEdit = () => {
    // Update props.allPlayers with the new data in editableItem
    // You will need to find and replace the item in props.allPlayers
    let updatedPlayers = [...props.allPlayers];
    updatedPlayers[current] = editableItem;
    props.setAllPlayers(updatedPlayers);

    setShowPopup(false);
    setShowPop(false);
  };

  const handleRemove = () => {
    // Filter out the item at the current index
    let updatedPlayers = props.allPlayers.filter(
      (_, index) => index !== current
    );
    props.setAllPlayers(updatedPlayers); // Assuming setAllPlayers is a method passed down from the parent component to update the players list

    setDeletePop(false);
    setShowPop(false); // Assuming setShowPop is to close another popup or modal
  };

  const handleInputChange = (index, value) => {
    setEditableItem({ ...editableItem, [index]: value });
    setActi(true);
    console.log(editableItem);
  };

  const handleRoleChange = (value, key) => {
    handleInputChange(key, value); // Assuming the 5th position is at index 4
  };

  const handleImport = () => {
    setPopup(false);

    props.setAllPlayers(listPlayers);
    console.log(props.allPlayers.length);

    const total = Math.ceil((props.allPlayers.length - 1) / 16);

    setTotalPages(total);
    console.log(total);
    console.log(totalPages);
  };

  const [showPop, setShowPop] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleDots = (event, item, key) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setEditableItem(item);
    setCurrent((currentPage - 1) * 16 + key);

    setShowPop(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setMessage("No file selected.");
      setFileName("");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n");
      const list = rows.map((row) =>
        row
          .split(/(?!\B"[^"]*),(?![^"]*"\B)/)
          .map((cell) => cell.trim().replace(/^"|"$/g, ""))
      );

      // Log rows and list for debugging
      console.log(rows);
      console.log(list);

      // Check for 'na' or 'undefined' values
      let invalidData = list.some((row) => row.includes(""));

      setTotalPlay(rows.length - 1);

      let goalkeeperCount = 0;
      list.forEach((row, index) => {
        if (index !== 0 && row[3] && row[3].toLowerCase() === "goalkeeper") {
          goalkeeperCount++;
        }
      });

      setGk(goalkeeperCount);
      console.log(gk);

      let midf = 0;
      list.forEach((row, index) => {
        if (index !== 0 && row[3] && row[3].toLowerCase() === "midfielder") {
          midf++;
        }
      });

      setMf(midf);

      let deff = 0;
      list.forEach((row, index) => {
        if (index !== 0 && row[3] && row[3].toLowerCase() === "defender") {
          deff++;
        }
      });

      setDef(deff);

      let forw = 0;
      list.forEach((row, index) => {
        if (index !== 0 && row[3] && row[3].toLowerCase() === "forward") {
          forw++;
        }
      });
      setFr(forw);

      console.log(invalidData);

      if (invalidData) {
        setMessage(
          "Your sheet is missing data. Please ensure all cells are filled out."
        );
        setFileAcc(false);
        setError(true);
      } else {
        console.log(list); // Log the list
        setFileAcc(true);
        setError(false);

        setListPlayers(list);
        //setMessage('File uploaded successfully.');
      }
    };

    reader.readAsText(file);
  };
  return (
    <>
      <div className="tab-page1">
        {showPopup && (
          <div className="overlay">
            <div className="center-box-3">
              <div className="bar-top">
                <div className="left"> Edit Player </div>
                <div className="right">
                  <img
                    alt=""
                    onClick={() => {
                      setShowPopup(false);
                    }}
                    src={close}
                  ></img>
                </div>
              </div>

              <div>
                <div className="layer">
                  <div style={{ width: "56%" }}>
                    <label>Player Name</label>
                    <input
                      key={0}
                      type="text"
                      value={editableItem[0]}
                      onChange={(e) => handleInputChange(0, e.target.value)}
                    />
                  </div>

                  <div style={{ width: "23%" }}>
                    <label>Jersey Number</label>
                    <input
                      key={0}
                      type="text"
                      value={editableItem[2]}
                      onChange={(e) => handleInputChange(2, e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="layer">
                  <div style={{ width: "39.5%" }}>
                    <label>Height</label>
                    <input
                      key={0}
                      type="text"
                      value={editableItem[4]}
                      onChange={(e) => handleInputChange(4, e.target.value)}
                    />
                  </div>

                  <div style={{ width: "39.5%" }}>
                    <label>Weight</label>
                    <input
                      key={0}
                      type="text"
                      value={editableItem[5]}
                      onChange={(e) => handleInputChange(5, e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="layer">
                  <div style={{ width: "100%" }}>
                    <label>Nationality</label>
                    <select
                      value={editableItem[6]}
                      onChange={(e) => handleRoleChange(e.target.value, 6)}
                    >
                      <option value="Costa Rican">Costa Rican</option>
                      <option value="Morocco">Morocco</option>
                      <option value="French">French</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Brazilian">Brazilian</option>
                      <option value="Italian">Italian</option>
                      <option value="Argentinian">Argentinian</option>
                      <option value="Guinea-Bissau">Guinea-Bissau</option>
                      <option value="Dutch">Dutch</option>
                      <option value="German">German</option>
                      <option value="Portuguese">Portuguese</option>
                      <option value="Senegal">Senegal</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <div className="layer">
                  <div style={{ width: "100%" }}>
                    <label>Role</label>
                    <select
                      value={editableItem[3]}
                      onChange={(e) => handleRoleChange(e.target.value, 3)}
                    >
                      <option value="Midfielder">Midfielder</option>
                      <option value="Goalkeeper">Goalkeeper</option>
                      <option value="Defender">Defender</option>
                      <option value="Forward">Forward</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="layer">
                <div style={{ width: "100%" }}>
                  <label>Starter</label>
                  <div className="radio-box">
                    <div className="rad-opt">
                      <input
                        type="radio"
                        name="status"
                        value="yes"
                        className="radio-input"
                        checked={editableItem[8] === "Yes"}
                        onChange={() => handleRadioChange("Yes")}
                        style = {{accentColor: "var(--primary-orange, #FEA013)"}}
                      />{" "}
                      Yes
                    </div>
                    <div className="rad-opt">
                      <input
                        type="radio"
                        name="status"
                        value="no"
                        className="radio-input"
                        checked={editableItem[8] === "No"}
                        onChange={() => handleRadioChange("No")}
                        style = {{accentColor: "var(--primary-orange, #FEA013)"}}
                      />{" "}
                      No
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={handleEdit} disabled={!acti}>
                Edit Player
              </button>
              {/* {Object.keys(editableItem).map((key, index) => (
            <input
              key={index}
              type="text"
              value={editableItem[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
          ))} */}
              {/* <button onClick={() => setShowPopup(false)}>Close</button>{" "} */}
            </div>{" "}
          </div>
        )}

        {deletePop && (
          <div className="overlay">
            <div className="center-box-4">
              <div className="bar-top">
                <div className="left"> Are you sure? </div>
                <div className="right">
                  <img
                    alt=""
                    onClick={() => {
                      setDeletePop(false);
                    }}
                    src={close}
                  ></img>
                </div>
              </div>

              <div className="message">This action cannot be undone.</div>

              <div
                className="button-import-2"
                onClick={() => {
                  setDeletePop(false);
                }}
              >
                {" "}
                Cancel
              </div>
              <div className="button-import" onClick={handleRemove}>
                {" "}
                Delete
              </div>

              {/* {Object.keys(editableItem).map((key, index) => (
            <input
              key={index}
              type="text"
              value={editableItem[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
          ))} */}
              {/* <button onClick={() => setShowPopup(false)}>Close</button>{" "} */}
            </div>{" "}
          </div>
        )}
        {popup && (
          <div className="overlay">
            <div className="center-box">
              <div className="bar-top">
                <div className="left"> Importer </div>
                <div className="right">
                  <img
                    alt=""
                    onClick={() => {
                      setPopup(false);
                    }}
                    src={close}
                  ></img>
                </div>
              </div>

              <div className="heading-popup">Roster Details</div>

              <div
                className={
                  !error
                    ? "file-input-container"
                    : "file-input-container active"
                }
              >
                <div className="file-name">{fileName}</div>
                <input
                  type="file"
                  id="fileInput"
                  accept=".csv"
                  onChange={handleFileChange}
                  hidden
                />
                <label
                  className={!error ? "label" : "label active"}
                  for="fileInput"
                >
                  Select File
                </label>
              </div>

              <div className="message"> {message}</div>

              {fileAcc && (
                <>
                  {" "}
                  <div className="heading-popup"> File Summary</div>
                  <div className="table">
                    <div className="inner-cell">
                      <div className="inner-upper">Total Players</div>

                      <div className="inner-lower">{totalPlay}</div>
                    </div>
                    <div className="inner-cell">
                      <div className="inner-upper"> Goalkeepers</div>

                      <div className="inner-lower">{gk}</div>
                    </div>

                    <div className="inner-cell">
                      <div className="inner-upper">Defenders</div>

                      <div className="inner-lower">{def}</div>
                    </div>
                    <div className="inner-cell">
                      <div className="inner-upper">Midfielders</div>

                      <div className="inner-lower">{mf}</div>
                    </div>
                    <div className="inner-cell">
                      <div className="inner-upper">Forwards</div>

                      <div className="inner-lower">{fr}</div>
                    </div>
                  </div>{" "}
                </>
              )}

              {fileAcc ? (
                <div className="button-import" onClick={handleImport}>
                  {" "}
                  Import
                </div>
              ) : (
                <div className="button-import inact"> Import</div>
              )}
            </div>
          </div>
        )}

        <div className="top-bar">
          <div className="top-left">
            <div className="upper-data">Rooster Details</div>
            <div className="lower-data">
              {!isEditing ? (
                props.name
              ) : (
                <input
                  type="text"
                  value={props.name}
                  onChange={(e) => props.setName(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              )}

              <img
                src={pen}
                alt="Edit"
                className={!props.named ? "edit-icon-1" : "edit-icon"}
                onClick={() => {
                  setIsEditing(true);
                }}
              />
            </div>
          </div>
          <div className="top-right">
            <div className="search">
              <div className="img">
                <img alt="" src={glass}></img>
              </div>
              <input
                type="text"
                placeholder="Find Player"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              ></input>
            </div>
            {props.allPlayers.length === 0 ? (
              <div
                className="import2"
                onClick={() => {
                  setPopup(true);
                }}
              >
                Import team
              </div>
            ) : (
              <div
                className="import"
                onClick={() => {
                  setPopup(true);
                }}
              >
                Re-Import team
              </div>
            )}
          </div>
        </div>

        <div className="bottom-page">
          <div className="heading">
            <div className="inner-head name">Player Name</div>
            <div className="inner-head">Jersey Number</div>
            <div className="inner-head">Starter</div>
            <div className="inner-head">Position</div>
            <div className="inner-head">Height</div>
            <div className="inner-head">Weight</div>
            <div className="inner-head">Nationality</div>
            <div className="inner-head">Appearances</div>
            <div className="inner-head">Minutes Played</div>
            <div className="inner-head point"></div>
          </div>

          <div className="players-list">
            {props.allPlayers.length === 0 && (
              <div className="inner-message">
                <div className="inner1">
                  You do not have any players on the roster
                </div>
                <div
                  className="inner2"
                  onClick={() => {
                    setPopup(true);
                  }}
                >
                  Import Team
                </div>
              </div>
            )}

            {props.allPlayers.length !== 0 &&
              currentItems.map((key, item) => {
                if (item !== 0 || search)
                  return (
                    <div className="players-details">
                      <div className="detail-lis name">
                        <img alt="" src={key[7]}></img>
                        {key[0]}
                      </div>
                      <div className="detail-lis">{key[2]}</div>
                      <div className="detail-lis">{key[8]}</div>
                      <div className="detail-lis">{key[3]}</div>
                      <div className="detail-lis">{key[4] / 100} m</div>
                      <div className="detail-lis">{key[5]} kg</div>
                      <div className="detail-lis">{key[6]}</div>
                      <div className="detail-lis">{key[9]}</div>
                      <div className="detail-lis">{key[10]}</div>
                      <div
                        className="detail-lis point"
                        onClick={(e) => handleDots(e, key, item)}
                      >
                        ...
                      </div>
                    </div>
                  );
                else {
                  return null;
                }
              })}

            {showPop && (
              <div
                className="popup"
                style={{
                  position: "absolute",
                  top: `${Math.max(
                    0,
                    Math.min(popupPosition.top - 150, window.innerHeight - 305)
                  )}px`, // Adjusts the top position
                  left: `${Math.max(
                    0,
                    Math.min(popupPosition.left - 300, window.innerWidth - 167)
                  )}px`, // Adjusts the left position
                  // Add more styling as needed
                }}
              >
                {/* Render popup content here */}
                <div className="bar-top">
                  <div className="left"> Actions </div>
                  <div className="right">
                    <img
                      alt=""
                      onClick={() => {
                        setShowPop(false);
                      }}
                      src={close}
                    ></img>
                  </div>
                </div>

                <div className="options">
                  <div
                    className="option-one"
                    onClick={() => {
                      setShowPop(false);
                      handleDotsClick();
                    }}
                  >
                    <img alt="" src={pen2}></img>
                    Edit
                  </div>

                  <div
                    className="option-one"
                    onClick={() => {
                      setShowPop(false);
                      setDeletePop(true);
                    }}
                  >
                    <img alt="" src={trash}></img>
                    Delete
                  </div>
                </div>
              </div>
            )}
          </div>

          {props.allPlayers.length !== 0 && search === false && (
            <div className="pagination-controls">
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button
                onClick={goToNextPage}
                disabled={
                  currentPage === Math.ceil((props.allPlayers.length - 1) / 16)
                }
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tab1;
