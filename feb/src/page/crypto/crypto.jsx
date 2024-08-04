import { useEffect, useState } from "react";
import Slider from "react-slick";
import "./cry-slick.css";
import "./cry-slick-theme.css";
import "./crypto.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import Crypt from "./crypt";
import Seclat from "../../component/latest/seclat";
import Busi from "../../component/business/busi";
import SpAds from "../../component/business/busAds";
import SpAdsz from "../../component/sport/spAds";
import Lat from "../../component/lat/lat";
import SearchForm from "../../component/searchForm/searchForm";

function Crypto() {
  const cate = useParams();
  const baseUrl = `/api/cat/custom?customing=${cate.category}&page=1&limit=5`; // Replace with your API endpoint
  const [data, setData] = useState([]);
  // const [dataz, setDataz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/post/all?q=${query}`);
  //     if (response.data) {
  //       navigate('/results', { state: { searchResults: response.data, query } });
  //       console.log(response.data)
  //     } else {
  //       console.warn('No results found');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching search results:', error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(baseUrl);
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setData(result.posts);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError("Failed to fetch data, please try again!");
        setLoading(false);
      }
    };
    fetchData();
  }, [baseUrl]);

  const thumbs = data.map((item) => item.newsPhoto);
  const settings = {
    customPaging: function (i) {
      return (
        <a style={{ marginRight: "5rem" }}>
          <div className="thumb-img">
            <img src={thumbs[i]} alt={`Thumbnail ${i + 1}`} />
          </div>
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="the-active-cover">
        {cate.category === "Cryptocurrency" ? (
          <div className="incover">
            <img src="/assets/crypt.png" alt="/assets/crypt.png" />
            <div className="in-title">Cryptocurrency</div>
          </div>
        ) : cate.category === "Fashion" ? (
          <div className="incover">
            <img src="/assets/fashion.png" alt="/assets/crypt.png" />
            <div className="in-title">Fashion</div>
          </div>
        ) : cate.category === "Business" ? (
          <div className="incover">
            <img src="/assets/bus.png" alt="/assets/crypt.png" />
            <div className="in-title">Business</div>
          </div>
        ) : cate.category === "Entertainment" ? (
          <div className="incover">
            <img src="/assets/entrt.png" alt="/assets/crypt.png" />
            <div className="in-title">Entertainment</div>
          </div>
        ) : cate.category === "Travel" ? (
          <div className="incover">
            <img src="/assets/bus.png" alt="/assets/crypt.png" />
            <div className="in-title">Travel</div>
          </div>
        ) : cate.category === "Sport" ? (
          <div className="incover">
            <img src="/assets/spt.png" alt="/assets/crypt.png" />
            <div className="in-title">Sport</div>
          </div>
        ) : cate.category === "Lifestyle" ? (
          <div className="incover">
            <img src="/assets/lfts.png" alt="/assets/crypt.png" />
            <div className="in-title">Lifestyle</div>
          </div>
        ) : cate.category === "Technology" ? (
          <div className="incover">
            <img src="/assets/tec.png" alt="/assets/crypt.png" />
            <div className="in-title">Technology</div>
          </div>
        ) : cate.category === "Politic" ? (
          <div className="incover">
            <img src="/assets/politics.png" alt="/assets/crypt.png" />
            <div className="in-title">Politics</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="home-caterg">
        <Link to="/">
          <div className="clas-home">Home</div>
        </Link>

        <div className="class-atge">{cate.category}</div>
      </div>
      <div className="crypto-completer-div">
        <div className="thefirst-sectin">
          <div className="cryp-left">
            <div className="slider-container  newstyle">
              <>
                <section className="crypt-img-cover">
                  <Slider {...settings}>
                    {data.map((item, index) => (
                      <div key={index} className="bolder-img">
                        <Link to={`/post/${item._id}`}>
                          <img
                            className="crypt-main-img"
                            src={
                              item.newsPhoto ? item.newsPhoto : "assets/ads.jpg"
                            }
                            alt={`Slide ${index + 1}`}
                          />
                          <div className="cryp-darkcovr">
                            <div className="crypto-conent">
                              <div className="crypt-cate">
                                <span> {item.category}</span>
                              </div>
                              <div className="crypt-title">{item.title}</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </Slider>
                </section>
              </>
            </div>
          </div>

          <div>
            <div className="newstyle-two">
              <div className="search-form">
                <SearchForm />
              </div>
              <div className="crypt-latest">
                <Lat headline="LATEST NEWS" />
              </div>
            </div>
          </div>
        </div>
        <section className="crypt-sec-two">
          <div className="sec-two-one">
            <Crypt varies={cate.category} />
          </div>

          <section className="sec-two-two">
            <Seclat
              topic={"Politics " && "Business" && "Sport"}
              theRange="5"
              headline="POPULAR POST"
            />
            <div className="cryp-social">
              <SpAdsz adImage="/assets/adss.jpg" />
            </div>
            <SpAds />
          </section>
        </section>
        <div className="thepagination"></div>
      </div>
    </>
  );
}

export default Crypto;
