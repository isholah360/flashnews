import "./latest.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Seclat from "./seclat";

function Latest() {
  const baseUrl = "http://localhost:5000/api/post/blogs";
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("fail to fetch data");
        }

        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        setError("Cannot fetch data right now, please try gin later");
      }
    };
    fetchData();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    fade: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <>
      <div className="minlist">
        <div className="lat-left">
          <div>
            {loading ? (
              <div>Loading....</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <>
                <Slider {...settings}>
                  {post.map((item) => (
                    <div key={item._id} className="list">
                      <Link to={`/post/${item._id}`} key={item._id}>
                        <div className="lists">
                          <div className="newimg">
                            <img src="./assets/temp.jpg" alt="" />
                          </div>
                          <div className="title-sum">
                            <div className="categ">
                              {item.category === "Lifestyle" ? (
                                <span className="life">life</span>
                              ) : item.category === "Sport" ? (
                                <span className="sport">sport</span>
                              ) : item.category === "Fashion" ? (
                                <span className="fash">Fashion</span>
                              ) : item.category === "Business" ? (
                                <span className="business">Business</span>
                              ) : item.category === "Technology" ? (
                                <span className="tech">Technology</span>
                              ) : item.category === "Marketing" ? (
                                <span className="market">Technology</span>
                              ) : (
                                ""
                              )}
                            </div>
                            <div style={{ fontSize: "1.5rem" }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: "1rem", display:"none"}}>{item.body}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider>
              </>
            )}
          </div>
        </div>
        <div className="lat-right">
          <div className="mostview">
            <div>
              <hr className="thehr" />
            </div>{" "}
            <span>MOST VIEW</span>
          </div>
         <Seclat/>
        </div>
      </div>
    </>
  );
}

export default Latest;

{
  /* <div key={item._id}>
            
            <Link to={`/post/${item._id}`} key={item._id}>
            
              <div className="lists">
                <div className="newimg">
                  {" "}
                  <img src="./assets/temp.jpg" alt="" />
                </div>
                <div style={{ fontSize: "1.5rem" }}>{item.title}</div>
                <div className="title">{item.body}</div>
              </div>
             
            
            </Link>
         
        </div> */
}
