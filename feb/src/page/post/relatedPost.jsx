import { Link } from "react-router-dom";
import "./post-slick.css";
import "./post-slick-theme.css";
import Slider from "react-slick";
import "./related.css";
import { useEffect, useRef, useState } from "react";

function RelatedPost({ corId, relatedCat, theUrl, amountX, buttonDisplay, secDisplay}) {
  const baseUrl = `${theUrl}/${relatedCat}`;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refined, setRefined] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("fail to fetch data");
        }

        const result = await response.json();
        setData(result);

        const filteredData = result.filter((element) => element._id !== corId);
        setRefined(filteredData);

        setIsLoading(false);
        setError(false);
      } catch (error) {
        setError("Cannot fetch data right now, please try gin later");
      }
    };
    fetchNews();
  }, [corId]);
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: `${amountX}`,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="xtra-button" style={{display:`${secDisplay}`}}>
        <div className="butoon" >
          <div className="button" onClick={previous}>
            &#8249;
          </div>
          <div className="button" onClick={next}>
            &#8250;
          </div>
        </div>
      </div>
      <div className="related-post" style={{display:`${buttonDisplay}`}}>
        <div className="shared related-p">Related post</div>
        <div className="theline">
          <hr />
        </div>

        <div className="butoon">
          <div className="button" onClick={previous}>
            &#8249;
          </div>
          <div className="button" onClick={next}>
            &#8250;
          </div>
        </div>
      </div>
      <div className="">
        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {isLoading ? (
            <span>Loading</span>
          ) : error ? (
            <span>{error}</span>
          ) : (
            refined.map((item) => (
              <div key={item._id} className="whole-foto">
                {item.category === `${corId}` ? null : (
                  <div className="related-foto">
                    {item.newsPhoto ? (
                      <Link to={`/post/${item._id}`}>
                        <img src={item.newsPhoto} alt="" />
                      </Link>
                    ) : (
                      <Link to={`/post/${item._id}`}>
                        <img src="assets/blog.jpg" alt="" />
                      </Link>
                    )}
                    <Link to={`/post/${item._id}`}>
                      <div className="feat-cover">
                        <div className="feat-cats">
                          <Link to={`/${item.category}`}>
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
                              <span className="markets">Marketing</span>
                            ) : (
                              ""
                            )}
                          </Link>
                        </div>
                        <div className="feat-cont">
                          <div className="date-cat">
                            <div className="feat-cat">
                              {item.create.slice(0, 10)}
                            </div>
                          </div>

                          <div className="feat-title">
                            <Link to={`/post/${item._id}`}>{item.title} </Link>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>
  );
}

export default RelatedPost;
