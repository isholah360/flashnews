import { useEffect, useState } from "react";
import "./travel.css";

function Travel({vary, varys, title}) {
  const baseUrl = `http://localhost:5000/api/post/${vary}`;
  const baseUri = `http://localhost:5000/api/post/${varys}`;
  const [post, setPost] = useState([]);
  const [postFour, setPostFour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          ("fail to fetch data");
        }
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (error) {
        setError("Cannot fetch data now, please try again later");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUri);
        if (!response.ok) {
          ("fail to fetch data");
        }
        const data = await response.json();
        setPostFour(data);
        setLoading(false);
      } catch (error) {
        setError("Cannot fetch data now, please try again later");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div style={{ padding: ".5rem 0" }}>
        <hr
          style={{
            margin: "-2rem 0% 1rem 0",
            height: ".1rem",
            background: "gray",
          }}
        />
        <div className="mostview">
          <div>
            <hr className="thehr" />
          </div>{" "}
          <span>{title}</span>
        </div>
        <div className="travel-component">
          <div className="travel-fotocontent">
            {" "}
            {loading ? (
              <span>loading...</span>
            ) : error ? (
              <span>{error}</span>
            ) : (
              <div>
                {post.map((item) => (
                  <div key={item._id} className="travel-sec-foto">
                    {item.newsPhoto ? <img src={item.newsPhoto} alt="" /> : item.newsPhoto ==="" ? <img src='assets/blog.jpg' alt="" />: ""}
                    
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="travel-justcontent">
            {" "}
            {loading ? (
              <span>loading...</span>
            ) : error ? (
              <span>{error}</span>
            ) : (
              <div>
                {postFour.map((item) => (
                    <ul key={item._id}>
                        <li style={{listStyle:"initial"}}>{item.title}</li>       
                    </ul>
                  
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Travel;
