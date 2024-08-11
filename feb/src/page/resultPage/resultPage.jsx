import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./result.css";
import Crypto from "../crypto/crypto";
import Crypt from "../crypto/crypt";
import Seclat from "../../component/latest/seclat";
import SpAdsz from "../../component/sport/spAds";
import SpAds from "../../component/business/busAds";
import Lat from "../../component/lat/lat";
import SearchForm from "../../component/searchForm/searchForm";

const ResultsPage = () => {
  const location = useLocation();
  const { searchResults = [], query } = location.state || {};
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  // Calculate the results to display based on the current page
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  // Handler to change page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/post/all?q=${query}`);
      if (response.data) {
        navigate("/results", {
          state: { searchResults: response.data, query },
        });
        console.log(response.data);
      } else {
        console.warn("No results found");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  console.log(query);

  return (
    <>
      <div className="result-complete">
        <div className="therusult">
          <h2 style={{ margin: "3rem 0" }}>Search Results for: "{query}"</h2>
          {searchResults.length > 0 ? (
            <>
              <div className="lis-display">
                <ul className="result-list">
                  {currentResults.map((result) => (
                    <li key={result.id}>
                      <Link to={`/post/blogs/${result.title}`}>
                        <div className="resul-img">
                          <img src={result.newsPhoto} alt="" />
                        </div>
                      </Link>

                      <div className="result-content">
                        <Link to={`/post/blogs/${result.title}`}>
                          <div className="result-title">{result.title}</div>
                        </Link>

                        <div className="result-excap">
                          {result.body.length > 150
                            ? result.body.slice(0, 170)
                            : result.body}
                          .....
                        </div>
                        <div className="result-date-auth">
                          <div className="result-date-auth">
                            {result.author}
                          </div>
                          <div className="result-art-date">
                            {result.createdAt.slice(0, 10)}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>No results found</p>
          )}
        </div>
        <div className="thesecond-result">
          <div>
            <div className="newstyle-two">
              <SearchForm />
              <div className="crypt-latest">
                <Lat headline="LATEST NEWS" />
              </div>
            </div>
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
          </section>
        </div>
      </div>
    </>
  );
};

export default ResultsPage;
