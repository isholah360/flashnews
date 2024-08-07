import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sport.css";
import Seclat from "../latest/seclat";
import SpGrid from "./spGrid";
import SpAdsz from "./spAds";

function Sport() {
  const baseUrl = "/api/post/sport";
  const [sport, setSport] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) return "fail to fetch data";
        const data = await response.json();
        const limitData = data.slice(0, 2);
        setSport(limitData);
        setLoading(false);
      } catch (error) {
        setError("fail to fetch data!, please try again");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <div className="sport-component">
          <div className="mostview">
            <div>
              <hr className="thehr" />
            </div>{" "}
            <Link to="/Sport">
              <span>DON'T MISS SPORT</span>
            </Link>
          </div>
          <div className="sport-display">
            <div className="sp-gridone">
              {" "}
              {sport.map((item) => (
                <div key={item._id}>
                  <div className="sport-img-content">
                    <div className="sport-img">
                      {item.newsPhoto ? (
                        <Link to={`https://flashnews-y0dp.onrender.com/post/${item._id}`}>
                        <img src={item.newsPhoto} alt="" />
                        </Link>
                      ) : (
                        <Link to={`https://flashnews-y0dp.onrender.com/post/${item._id}`}>
                        <img src="assets/blog.jpg"  alt="" />
                        </Link>
                      )}
                    </div>

                    <div className="sport-content">
                      <div className="sport-auth-date">
                        <div className="author">by {item.author}</div>
                        <div className="created">
                          {item.create.slice(0, 10)}
                        </div>
                      </div>
                      <div className="sport-title"><Link to={`https://flashnews-y0dp.onrender.com/post/${item._id}`}>{item.title}</Link></div>
                      <div className="excerp">
                        {item.body.length > 125 ? (
                          <span>{item.body.slice(0, 125)}...</span>
                        ) : (
                          item.body
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="sp-gridtwo">
              <SpGrid />
            </div>
            <div className="sp-gridtree">
              <SpAdsz adImage="assets/adss.jpg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sport;
