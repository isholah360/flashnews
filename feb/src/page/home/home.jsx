import Business from "../../component/business/business";
import Editor from "../../component/editor/editor";
import Entert from "../../component/entert/entert";
import Footer from "../../component/footer/footer";
import Latest from "../../component/latest/latest";
import Sport from "../../component/sport/sport";
import Travel from "../../component/travel/travel";
import VideFile from "../../component/vid/vid";


import "./home.css";
function Home() {
  return (
    <div>
      <div className="thelatest">
        <Latest />
        <Editor />
        <div className="lifestyle-tavel">
          <Travel vary="lifeone" varys="lifefour" title="LIFESTYLE" />
          <Travel vary="techone" varys="techfour" title="TECHNOLOGY" />
        </div>
        <div className="lifestyle-tavel">
          <Travel vary="travelone" varys="travelfour" title="TRAVEL" />
          <Travel vary="crypto" varys="cryptofour" title="CRYPTOCURRENCY" />
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
        <VideFile/>
        <Footer/>
      </div>
    </div>
  );
}

export default Home;
