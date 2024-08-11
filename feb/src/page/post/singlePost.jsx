import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentLike from "../../component/comlike/comlike";
import "./sing.css";
import SpAdsz from "../../component/sport/spAds";
import RelatedPost from "./relatedPost";
import Lat from "../../component/lat/lat";
import EntAds from "../../component/entert/entAds";

function SinglePost() {
  const baseUrl = "/api/post/blogs";
  const [post, setPost] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { title } = useParams();
  console.log(title)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPost = localStorage.getItem(`${title}`);
        if (storedPost) {
          setPost(JSON.parse(storedPost));
          setLoading(false);
        } else {
          const response = await fetch(`${baseUrl}/${title}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const postData = await response.json();
          setPost(postData);
          localStorage.setItem(`${title}`, JSON.stringify(postData));
          setLoading(false);
        }
      } catch (error) {
        setError("Cannot fetch data right now, please try again later");
        setLoading(false);
      }
    };
  
    fetchData();
  }, [title]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="sing-complete">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="single-post-arti">
            <div className="post-comment">
              <div className="sing-categ">
                <Link to="/">
                  <div className="clas-home">Home</div>
                </Link>
                <Link to="/Business">
                  <div className="class-atge">{post.category}</div>
                </Link>
                <div className="class-atge mob-tit">{post.title}</div>
              </div>
              <div className="sing-post-title">{post.title}</div>
              <div className="date-comment-by">
                <div className="date-and-img">
                  <div className="dat-png">
                    <img
                      className="img-clasic"
                      src="/assets/calendar.png"
                      alt="assets/calendar.png"
                    />
                  </div>
                  <div className="main-date">{formatDate(post.createdAt)}</div>
                </div>
                <div className="">
                  <CommentLike formdisplay="none" />
                </div>
                <div className="date-and-img">
                  <div className="dat-png">
                    <img src="/assets/book.png" alt="assets/calendar.png" />
                  </div>
                  <div className="main-date">4 Mins Read</div>
                </div>
              </div>
              <div className="title-img">
                <img src={post.newsPhoto} alt="" />
              </div>
              <div className="title-body">
                {post.body.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div>
                <div className="share-media">
                  <div className="shared">Share this post :</div>
                  <div className="share-med">
                    <span className="media-img">
                      <img src="/assets/fbcirc.png" alt="" />
                      <div className="the-fb">Facebook</div>
                    </span>
                    <span className="media-img twit">
                      <img src="/assets/twi.png" alt="" />
                      <div className="the-fb">Twitter</div>
                    </span>
                    <span className="media-img inst">
                      <img src="/assets/ins.png" alt="" />
                      <div className="the-fb">Instagram</div>
                    </span>
                  </div>
                </div>
                <div className="sing-ads-img">
                  <img src="/assets/ads.jpg" alt="" />
                </div>
                <CommentLike displays="none" />
                <div className="sing-tagx">
                  <div className="shared">Related Tags :</div>
                  <div className="clas-tag">Buisness</div>
                  <div className="clas-tag">Wealth</div>
                  <div className="clas-tag">Job</div>
                </div>
                <div className="sing-ads-img seco-sing-ads">
                  <img src="/assets/fasads.png" alt="" />
                  <div className="sing-ads-cover">
                    <div className="sing-cover-content">
                      <div className="create-pers">
                        Create a new perspective on life
                      </div>
                      <div className="your-ads-here">
                        Your Ads Here (840 x 160 area)
                      </div>
                      <button>PURCHASE NOW</button>
                    </div>
                  </div>
                </div>
                <RelatedPost
                  corId={post._id}
                  relatedCat={post.category}
                  theUrl="https://flashnews-y0dp.onrender.com/post/"
                  amountX="3"
                />
              </div>
            </div>
            <div className="author-ads">
              <div className="search-form in-sing-post">
                <form>
                  <input type="text" placeholder="Search here.." />
                  <button className="search-sym">
                    <img src="/assets/sa.png" alt="" />
                  </button>
                </form>
              </div>
              <div className="auh-profile">
                <div className="auth-pro-img">
                  {post.authorPhoto ? (
                    <img src={post.authorPhoto} alt="" />
                  ) : (
                    <img src="/assets/tun.jpg" alt="" />
                  )}{" "}
                </div>
                <div className="auth-pro-name">
                  {post.author ? post.author : "Tunrayo Duro"}
                </div>
              </div>
              <SpAdsz adImage="/assets/adss.jpg" />
              <div className="sing-latest">
                <Lat headline="LATEST NEWS" />
              </div>
              <div className="sing-latest">
                <EntAds weekly="none" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SinglePost;
