import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sport.css";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function SpGrid() {
  const baseUrl = "http://localhost:5000/api/post/sport";
  const [sport, setSport] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) return "fail to fetch data";
        const data = await response.json();
        const limitData = data.slice(0, 8);
        setSport(limitData.slice(2));
        setLoading(false);
      } catch (error) {
        setError("fail to fetch data!, please try again");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="sport-list">
        {sport.map((item) => (
          <div key={item._id}>
            <div className="spgrid-content">
              <div className="spg-img">
                <Link to={`/post/${item._id} `}>
                  <img src={item.newsPhoto} alt="" />
                </Link>
              </div>
              <div className="spg-content">
                <div className="spg-title">
                  <Link to={`/post/${item._id} `}>{item.title}</Link>
                </div>
                <div className="byauth">
                  <div className="spg-author">
                    {item.author ? <span>{item.author}</span> : "Tunrayo"}
                  </div>
                  <div className="like-comment">
                    <div className="like-number">
                      <img src="assets/like.png" alt="" />
                      <span
                        style={{
                          margin: "0 -.5rem",
                          fontSize: ".9rem",
                          paddingTop: ".05rem",
                        }}
                      >
                        {getRandomInt(10, 100)}
                      </span>
                    </div>
                    <div className="like-number">
                      <img
                        style={{ marginLeft: ".3rem" }}
                        src="assets/com.png"
                        alt=""
                      />
                      <span
                        style={{
                          margin: "0 -.5rem",
                          fontSize: ".9rem",
                          paddingTop: ".05rem",
                        }}
                      >
                        {getRandomInt(5, 50)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ color: "gray" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpGrid;
