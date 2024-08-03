import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUpdateMutation } from "../../component/redux/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function EditProfile() {
  const userId = useParams();

  const baseUrl = "http://localhost:5000/api/writer/profile";
  const [post, setPost] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [specData, setSpecData] = useState();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState("");

  const [frus, setFrus] = useState([]);
  const [frusInput, setFrusInput] = useState("");

  const navigate = useNavigate();
  const [update] = useUpdateMutation();
  const {userInfo} =  useSelector(state => state.user)

  const handleFrusInputChange = (e) => {
    setFrusInput(e.target.value);
  };

  const handleGoalInputChange = (e) => {
    setGoalInput(e.target.value);
  };

  const handleAddFrus = () => {
    if (frusInput.trim() !== "") {
      setFrus([...frus, frusInput.trim()]);
      setFrusInput("");
    }
  };

  const handleAddGoal = () => {
    if (goalInput.trim() !== "") {
      setGoals([...goals, goalInput.trim()]);
      setGoalInput("");
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

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
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const respond = await update({
      id: userId.id,
      data: {
        email: formData.email,
        username: formData.username,
        name: formData.name,
        price: formData.price,
        niche: formData.niche,
        loyal: formData.loyal,
        creative: formData.creative,
        passive: formData.passive,
        introvert: formData.introvert,
        convenience: formData.convenience,
        mile: formData.mile,
        speed: formData.speed,
        comfort: formData.comfort,
        bio: formData.bio,
        age: formData.age,
        status: formData.status,
        location: formData.location,
        quote: formData.quote,
        tags,
        frustration: frus,
        goal: goals,
      },
    });
    if (respond.error) {
      setSpecData(respond.error.data);
    }else if(respond.data) {
      navigate(`/user/${userId.id}`);
    }
    
    
  };
  // useEffect(()=>{
   
  //     {specData.error === "You're unauthoried" ? 
  //       setError(specData.data): navigate(`/user/${userId.id}`);
  //     }
      
  
  // }, [specData])

  return (
    <div>
      {loading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>{error}</span>
      ) : (
        <div className="profileDisplay">
          <form onSubmit={handleUpdate}>
            <div className="the-edit-form">
              <div className="prof-first">
                <div className="admin-profile-img">
                  <img src={post.profilePhoto} alt="" />
                </div>
                <div className="prof-nmae">
                  <input
                    rows={1}
                    defaultValue={post.name}
                    onChange={handleChange}
                    name="name"
                  />
                </div>
                <div className="prof-niche">
                  <input
                    defaultValue={post.niche}
                    onChange={handleChange}
                    name="niche"
                  />
                </div>
                <div className="quote-c">
                  <span> " </span>
                  <textarea
                    rows={6}
                    onChange={handleChange}
                    name="quote"
                    defaultValue={post.quote}
                  />
                  <span>"</span>
                </div>
                <div className="age-heights">
                  <div className="age-cover">
                    <div className="age">
                      Age:{" "}
                      <span>
                        {" "}
                        <textarea
                          defaultValue={post.age}
                          onChange={handleChange}
                          name="age"
                        />{" "}
                      </span>
                    </div>
                    <div className="age">
                      Status:{" "}
                      <span>
                        {" "}
                        <textarea
                          defaultValue={post.status}
                          onChange={handleChange}
                          name="status"
                        />{" "}
                      </span>
                    </div>
                    <div className="age">
                      email:{" "}
                      <span>
                        {" "}
                        <textarea
                          defaultValue={post.email}
                          onChange={handleChange}
                          name="email"
                        />{" "}
                      </span>
                    </div>
                    <div className="age">
                      Location:{" "}
                      <span>
                        {" "}
                        <textarea
                          defaultValue={post.location}
                          name="location"
                          onChange={handleChange}
                        />{" "}
                      </span>
                    </div>
                  </div>
                  <div className="the-tags">
                    <label>Personal Tags:</label>
                    <br />
                    <div className="tag-list">
                      {tags.map((tag, index) => (
                        <div key={index}>
                          <div className="pers-like">{tag}</div>
                        </div>
                      ))}
                    </div>
                    <div className="input-add-button">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        placeholder="Add a tag"
                      />
                      <div onClick={handleAddTag}>Add</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prof-sec">
                <div className="the-bio">
                  <span>Bio</span> <br />
                  <textarea
                    className="bio-edit"
                    name="bio"
                    onChange={handleChange}
                    rows={10}
                    defaultValue={post.bio}
                  />
                </div>
                <div className="the-bio">
                  <span>Personality</span> <br />
                  <>
                    <div className="complete-person-guage">
                      <div className="name-person">
                        <div className="first-person">Introvert</div>
                        <div className="sec-person">Extrovert</div>
                      </div>
                      <div className="w3-light-gre">
                        <div
                          className="convenience"
                          style={{ width: `${formData.introvert}%` }}
                        ></div>
                        <input
                          type="number"
                          name="introvert"
                          placeholder="Introvert%"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="complete-person-guage">
                      <div className="name-person">
                        <div className="first-person">Analytics</div>
                        <div className="sec-person">Creative</div>
                      </div>
                      <div className="w3-light-gre">
                        <div
                          className="convenience"
                          style={{ width: `${formData.creative}%` }}
                        ></div>
                        <input
                          type="number"
                          name="creative"
                          placeholder="Creative%"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="complete-person-guage">
                      <div className="name-person">
                        <div className="first-person">Loyal</div>
                        <div className="sec-person">Fickle</div>
                      </div>
                      <div className="w3-light-gre">
                        <div
                          className="convenience"
                          style={{ width: `${formData.loyal}%` }}
                        ></div>
                        <input
                          type="number"
                          name="loyal"
                          placeholder="Loyal%"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="complete-person-guage">
                      <div className="name-person">
                        <div className="first-person">Passive</div>
                        <div className="sec-person ">Active</div>
                      </div>
                      <div className="w3-light-gre">
                        <div
                          className="convenience"
                          style={{ width: `${formData.passive}%` }}
                        ></div>
                        <input
                          type="number"
                          name="passive"
                          placeholder="Passive%"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                </div>
                <div className="the-bio">
                  <div>
                    <label>Personal Goals:</label>
                    <ul>
                      {goals.map((goal, index) => (
                        <li key={index} className="list-goal">
                          {goal}
                        </li>
                      ))}
                    </ul>
                    <div className="input-add-button">
                      <input
                        className="goal-input"
                        type="text"
                        value={goalInput}
                        onChange={handleGoalInputChange}
                        placeholder="Add a goal"
                      />
                      <div onClick={handleAddGoal}>Add</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prof-thir">
                <div className="the-bio">
                  <span>Motivation</span> <br />
                  <>
                    <div className="complete-person-motive">
                      <div className="w3-light-gre">
                        <div className="price"></div>
                        <div
                          className="price"
                          style={{ width: `${formData.price}%` }}
                        ></div>
                        <input
                          type="number"
                          name="price"
                          placeholder="Price%"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="complete-person-motive">
                      <div className="w3-light-gre">
                        <div
                          className="comfort"
                          style={{ width: `${formData.comfort}%` }}
                        ></div>
                        <input
                          type="number"
                          name="comfort"
                          placeholder="Comfort%"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="complete-person-motive">
                      <div className="w3-light-gre">
                        <div
                          className="convenience"
                          style={{ width: `${formData.convenience}%` }}
                        ></div>
                        <input
                          type="number"
                          name="convenience"
                          placeholder="Convenience%"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="complete-person-motive">
                      <div className="w3-light-gre">
                        <div
                          className="speed"
                          style={{ width: `${formData.speed}%` }}
                        ></div>
                        <input
                          type="number"
                          name="speed"
                          placeholder="speed%"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="complete-person-motive">
                      <div className="w3-light-gre">
                        <div
                          className="speed"
                          style={{ width: `${formData.mile}%` }}
                        ></div>
                        <input
                          type="number"
                          name="mile"
                          placeholder="Mile%"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                </div>
                <div className="the-bio">
                  <span>Frustrations</span> <br />
                  <div className="the-bi">
                    <div>
                      <ul>
                        {frus.map((goal, index) => (
                          <li key={index} className="list-goal">
                            {goal}
                          </li>
                        ))}
                      </ul>
                      <div className="input-add-button">
                        <input
                          className="goal-input"
                          type="text"
                          value={frusInput}
                          onChange={handleFrusInputChange}
                          placeholder="Add frustraions"
                        />
                        <div onClick={handleAddFrus}>Add</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="the-bio">
                  <span>Frustrations</span> <br />
                  <>
                    <div className="num-of-arti">
                      <div className="num-articls">Number of Articles</div>
                      <div className="num-count">40</div>
                    </div>
                    <div className="edit-logout">
                      <button>Update</button>
                      <Link to={`/user/${userId.id}`}>
                        <div>Profile</div>
                      </Link>
                      <div>Log out</div>
                    </div>
                    <div className="theerror" >
                      {specData && <span>{`${specData} `}   <Link to='/login'>
                      <span style={{color:"blue"}}>please login</span>
                      </Link></span>}
                      
                    </div>
                  </>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
