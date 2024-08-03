import { useState, useEffect } from "react";
import { useRegMutation } from "../../component/redux/user/userApiSlice";
import { setCred } from "../../component/redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../login/login.css";

function Reg() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegMutation();

//   useEffect(() => {
//     if (userInfo) {
//       navigate("/");
//     }
//   }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData).unwrap;
      console.log(res)
      navigate("/login");
    } catch (err) {
      err.data.message;
    }
  };
  return (
    <div className="signin-complete">
      <div className="signup">Welcome! <br style={{lineHeight:'1.2rem'}} /> Log In</div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
          <br />
          <input type="text" name="username" id="" onChange={handleChange} />
          <br />
          <label htmlFor="">email</label>
          <br />
          <input type="text" name="email" id="" onChange={handleChange} />
          <br />
          <label htmlFor="">password</label>
          <br />
          <input
            type="password"
            name="password"
            id=""
            onChange={handleChange}
          />
          <br />
          <button>submit</button>
          <span>{isLoading && <span>Loading</span>}</span>
          <div style={{ color: "red" }} className="theerror">
            {error  && <span>{error.data.message}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reg;
