import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./profile.css";

function UserProfile() {
  const userId = useParams();

  const baseUrl = "http://localhost:5000/api/writer/profile";
  const [post, setPost] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/${userId.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const postData = await response.json();
        setPost(postData);
        console.log(post);
        setLoading(false);
      } catch (error) {
        setError("Cannot fetch data right now, please try gin later");
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);
  return (
    <div>
      {loading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>{error}</span>
      ) : (
        <div className="profileDisplay">
          <div className="prof-first">
            <div className="admin-profile-img">
              <img src={post.profilePhoto} alt="" />
            </div>
            <div className="prof-nmae">{post.name}</div>
            <div className="prof-niche">{post.niche}</div>
            <div className="quote-c">
              {" "}
              <span> " </span>
              {post.quote} <span>"</span>
            </div>
            <div className="age-heights">
              <div className="age-cover">
                <div className="age">
                  Age: <span>{post.age}</span>
                </div>
                <div className="age">
                  Status: <span>{post.status}</span>
                </div>
                <div className="age">
                  email: <span>{post.email}</span>
                </div>
                <div className="age">
                  Location: <span>{post.location}</span>
                </div>
              </div>
              <div className="the-tags">
                {post.tags.map((tag, index) => (
                  <div key={index}>
                    <div className="my-tga">{tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="prof-sec">
            <div className="the-bio">
              <span>Bio</span> <br />
              <>{post.bio}</>
            </div>
            <div className="the-bio">
              <span>Personality</span> <br />
              <>
                <div className="complete-person-guage">
                  <div className="name-person">
                    <div className="first-person">Introvert</div>
                    <div className="sec-person">Extrovert</div>
                  </div>
                  <div className="w3-light-grey">
                    <div
                      className="w3-inner-grey"
                      style={{ marginLeft: `${post.introvert}%` }}
                    ></div>
                  </div>
                </div>
                <div className="complete-person-guage">
                  <div className="name-person">
                    <div className="first-person">Analytics</div>
                    <div className="sec-person">Creative</div>
                  </div>
                  <div className="w3-light-grey">
                    <div
                      className="w3-inner-grey creative"
                      style={{ marginLeft: `${post.creative}%` }}
                    ></div>
                  </div>
                </div>
                <div className="complete-person-guage">
                  <div className="name-person">
                    <div className="first-person">Loyal</div>
                    <div className="sec-person">Fickle</div>
                  </div>
                  <div className="w3-light-grey">
                    <div
                      className="w3-inner-grey "
                      style={{ marginLeft: `${post.loyal}%` }}
                    ></div>
                  </div>
                </div>
                <div className="complete-person-guage">
                  <div className="name-person">
                    <div className="first-person">Passive</div>
                    <div className="sec-person ">Active</div>
                  </div>
                  <div className="w3-light-grey">
                    <div
                      className="w3-inner-grey passive"
                      style={{ marginLeft: `${post.passive}%` }}
                    ></div>
                  </div>
                </div>
              </>
            </div>
            <div className="the-bio">
              <span>Goals</span> <br />
              <>
                <ul>
                  {post.goal.map((tag, index) => (
                    <ul key={index}>
                      <li className="my-tga">{tag}</li>
                    </ul>
                  ))}
                </ul>
              </>
            </div>
          </div>
          <div className="prof-thir">
            <div className="the-bio">
              <span>Motivation</span> <br />
              <>
                <div className="complete-person-motive">
                  <div className="sec-person">Price</div>
                  <div className="w3-light-grey">
                    <div
                      className="price"
                      style={{ width: `${post.price}%` }}
                    ></div>
                  </div>
                </div>
                <div className="complete-person-motive">
                  <div className="sec-person">Comfort</div>
                  <div className="w3-light-grey">
                    <div
                      className="comfort"
                      style={{ width: `${post.comfort}%` }}
                    ></div>
                  </div>
                </div>
                <div className="complete-person-motive">
                  <div className="sec-person">Convenience</div>
                  <div className="w3-light-grey">
                    <div
                      className="convenience"
                      style={{ width: `${post.convenience}%` }}
                    ></div>
                  </div>
                </div>
                <div className="complete-person-motive">
                  <div className="sec-person">Speed</div>
                  <div className="w3-light-grey">
                    <div
                      className="speed"
                      style={{ width: `${post.speed}%` }}
                    ></div>
                  </div>
                </div>
                <div className="complete-person-motive">
                  <div className="sec-person">Mile</div>
                  <div className="w3-light-grey">
                    <div
                      className="mile"
                      style={{ width: `${post.mile}%` }}
                    ></div>
                  </div>
                </div>
              </>
            </div>
            <div className="the-bio">
              <span>Frustrations</span> <br />
              <>
                <ul>
                  {post.goal.map((tag, index) => (
                    <ul key={index}>
                      <li className="my-tga">{tag}</li>
                    </ul>
                  ))}
                </ul>
              </>
            </div>
            <div className="the-bio">
              <span>Frustrations</span> <br />
              <>
                <div className="num-of-arti">
                  <div className="num-articls">Number of Articles</div>
                  <div className="num-count">40</div>
                </div>
                <div className="edit-logout">
                  <Link to={`/edit/${userId.id}`}>
                    <button>Edit Profile</button>
                  </Link>

                  <button>Log out</button>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
