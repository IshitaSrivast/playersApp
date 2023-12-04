import React, { useContext, useState } from "react";
import "./pages.scss";
import icon from "../assets/icon.png";
import act1 from '../assets/in1.png'
import tab1 from '../assets/tab1.png'
import act2 from '../assets/in2.png'
import tab2 from '../assets/tab2.png'

const LeftBar = (props) => {
    const [active, setActive] = useState(1)

  return (
    <div className="left-bar">
      <div className="svg">
        <div className="inner-svg">
          <img style = {{width:"37px"}} src={icon}></img>
        </div>
        <div className="inner-svg">
        { active ===1 &&<svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
          >
            <circle cx="2" cy="2" r="2" fill="#FEA013" />
          </svg>}

          <img onClick= {()=>{setActive(1);
          props.setTab(true)}} src={active===1? tab1: act1}></img>
        </div>
        <div className="inner-svg">
          { active ===2 && <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
          >
            <circle cx="2" cy="2" r="2" fill="#FEA013" />
          </svg>}
          <img onClick= {()=>{setActive(2);
          props.setTab(false)}} src={active===2? tab2: act2}></img>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
