import {
  VideFile,
  Travel,
  Business,
  Editor,
  Entert,
  Footer,
  Latest,
  Seclast,
  Sport,
} from "../../component/index.js";
import { Link } from "react-router-dom";

import "./home.css";


function Home() {
  return (
    <div>
      <div className="thelatest">
        <Latest />
        <Editor />
        <div className="lifestyle-tavel">
          <Travel vary="lifeone" varys="lifefour" title="Lifestyle" />
          <Travel vary="techone" varys="techfour" title="Technology" />
        </div>
        <div className="lifestyle-tavel">
          <Travel vary="travelone" varys="travelfour" title="Travel" />
          <Travel vary="crypto" varys="cryptofour" title="Cryptocurrency" />
        </div>
        <hr
          style={{
            margin: "1rem 5% 1rem 5%",
            height: ".1rem",
            background: "gray",
            padding: "0 5%",
          }}
        />
        <Sport />
        <hr
          style={{
            margin: "1rem 5% 1rem 5%",
            height: ".1rem",
            background: "gray",
            padding: "0 5%",
          }}
        />
        <Business />
        <hr
          style={{
            margin: "1rem 5% 1rem 5%",
            height: ".1rem",
            background: "gray",
            padding: "0 5%",
          }}
        />
        <Entert />
        <div className="thefull-ent">
          <img src="assets/fash4.jpg" alt="beauty" />
        </div>
        <VideFile />
      </div>
    </div>
  );
}

export default Home;
