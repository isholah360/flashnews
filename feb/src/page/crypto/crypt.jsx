import React from "react";
import "./crypto.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function Crypt({varies}) {
  const baseUrl = `/api/cat/custom`; // Replace with your API endpoint
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchData = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}?customing=${varies}&page=${page}&limit=15`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const result = await res.json();
      setData(result.posts.slice(5));
      setTotalPages(result.totalPages);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data, please try again!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={i === page ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="">
      {data.map((item, index) => (
        <div key={index} className="bolder-rest-content">
          <div className="cryto-rest-img">
            <Link to={`http://localhost:5173/post/${item._id}`}>
              <img
                className=""
                src={item.newsPhoto}
                alt={`Slide ${index + 1}`}
              />
            </Link>
          </div>

          <div className="">
            <div className="crypto-conents">
              <div className="crypt-cate">
                <span> {item.category}</span>
              </div>
              <div className="sec-crypt-title">
                <Link to={`/post/${item._id}`}>
                  <div className="">{item.title}</div>
                </Link>
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
        </div>
      ))}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Crypt;
