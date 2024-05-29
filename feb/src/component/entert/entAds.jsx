import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../business/busads.css";
import { Link } from "react-router-dom";

function EntAds() {
  const baseUrl = "http://localhost:5000/api/post/all";

  const [weekpost, setWeekpost] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(baseUrl);
        if (!res.ok) return "fail to fetch data";
        const data = await res.json();
        setWeekpost(data.slice(0, 10));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("fall to fetch data please again!");
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
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  return (
    <div className="ent-ads">
      <div className="mostview">
        <div>
          <hr className="thehr" />
        </div>{" "}
        <span>Categories</span>
      </div>
      <div className="mainweek">
       <div className="Politics">Politics</div>
       <div className="Politics">Business</div>
       <div className="Politics">Investment</div>
       <div className="Politics">Lifestyle</div>
       <div className="Politics">Entertainment</div>
       <div className="Politics">Travel</div>
       <div className="Politics">Technology</div>
       <div className="Politics">Fashion</div>
      </div>
      <div className="weeklypost">
        <div className="mostview">
          <div>
            <hr className="thehr" />
          </div>{" "}
          <span>Weekly Post</span>
        </div>
        <div className="mainweek">
          <div className="sub-mainweek">
            {loading ? (
              <div>Loading....</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <>
                <Slider {...settings}>
                  {weekpost.map((item) => (
                    <div key={item._id} className="list">
                      <Link to={`/post/${item._id}`} key={item._id}>
                        <div className="week-img-list">
                          <div className="week-img">
                            { <img/> ? (
                              <img src={item.newsPhoto} alt="" />
                            ) : (
                              <img src="assets/blog.jpg" alt="" />
                            )}
                          </div>
                          <div className="weekl-title-sum">
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
                            <div className="midweek-title">
                              {item.title}
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
        </div>
      </div>
    </div>
  );
}

export default EntAds;
