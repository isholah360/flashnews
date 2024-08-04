import "./latest.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Seclat from "./seclat";

function Latest() {
  const baseUrl = "/api/post/blogs";
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
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  return (
    <>
      <div className="minlist">
        <div className="lat-left">
          <div className="dot-list">
            {loading ? (
              <div>Loading....</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <>
                <Slider
                  ref={(slider) => {
                    sliderRef = slider;
                  }}
                  {...settings}
                >
                  {post.map((item) => (
                    <div key={item._id} className="list">
                      <Link to={`/post/${item._id}`} key={item._id}>
                        <div className="lists">
                          <div className="newimg">
                            {item.newsPhoto ? (
                              <Link to={`/${item._id}`}>
                                <img src={item.newsPhoto} alt="" />
                              </Link>
                            ) : (
                              <Link to={`/${item._id}`}>
                                <img src="assets/blog.jpg" alt="" />
                              </Link>
                            )}
                            <div className="crypt-img-cov">
                              <div className="lat-cat">
                                {item.category === "Lifestyle" ? (
                                  <span className="life">Lifestyle</span>
                                ) : item.category === "Sport" ? (
                                  <span className="sport">Sport</span>
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

                                <div className="hero-title">{item.title}</div>
                              </div>

                              <div></div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider>
              </>
            )}
          </div>
          <div className="latest-button">
            <div className="butoon">
              <div className="button" onClick={previous}>
                &#8249;
              </div>
              <div className="button right" onClick={next}>
                &#8250;
              </div>
            </div>
          </div>
        </div>
        <div className="lat-right">
          <Seclat
            topic={"Politics " && "Business"}
            theRange="4"
            headline="MOST VIEW"
          />
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
