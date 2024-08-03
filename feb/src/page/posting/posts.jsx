import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./posts.css";
import axios from "axios";

function Posts() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const baseUrl = "/api/blog/post";

  const navigate = useNavigate();

  useEffect(
    (image) => {
      imageUploads(image);
    },
    [image]
  );
  useEffect(() => {
    if (url) {
      // If `url` has a value, update `formData`
      setFormData((prevFormData) => ({
        ...prevFormData,
        newsPhoto: url,
      }));
    }
  }, [url]);

  const imageUploads = async () => {
    try {
      console.log(image);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "thenews"); // Optional: Use unsigned upload preset if needed
      formData.append("cloud_name", ""); // Optional: Use unsigned upload preset if needed

      fetch(`https://api.cloudinary.com/v1_1/dalgtgsxy/image/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setUrl(data.url);
        });
    } catch (error) {
      console.error("Error during upload:", error); // Capture the specific error message
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(url);
  console.log(formData);

  const cloudImageUpload = () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setSuccess(data);
      setIsLoading(false);
      // {data.status === 201 ?  navigate("/") : alert(data) }
      // alert(data);
      // navigate("/");
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  return (
    <div style={{ padding: "0  10%" }}>
      <div className="makepost">Make Post</div>
      <div className="theform">
        <div className="formgrid">
          <form onSubmit={handleSubmit}>
            <input
              cols="80"
              rows="1"
              style={{ padding: ".5rem .8rem", outline: "none", width: "90%" }}
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="category"
              placeholder="Category"
              onChange={handleChange}
            />
            <input
              type="text"
              style={{margin:"0 0rem 0 3rem"}}
              name="tag"
              placeholder="Tags"
              onChange={handleChange}
            />
            {/* <select name="" id="">
              <option value=""></option>
              <option value="">yusuf</option>
              <option value="">yusuf</option>
            </select> */}
            <br />
            <br />
            <textarea
              style={{ padding: "0.7rem" }}
              name="body"
              id=""
              cols="80"
              rows="20"
              placeholder="Content"
              onChange={handleChange}
            />
            <br />
            <button>Submit</button>
          </form>
        </div>
        <div className="imgrid">
          <div className="upload">Upload Image</div>
          <input
            type="file"
            name="photo"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="imagepre">
            <div className="tumbnail">
              {url ? (
                <img src={`${url}`} alt="image" />
              ) : (
                <img src="/assets/imgicon.jpg" alt="image" />
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoading ? <span>Loading...</span> : <span>{success === "You're unauthoried"? <span>{success}</span>: ""}</span>}
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}

export default Posts;
