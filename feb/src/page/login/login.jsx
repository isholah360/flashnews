import { useState, useEffect } from "react";
import {useLoginMutation} from '../../component/redux/user/userApiSlice'
import {setCred} from '../../component/redux/user/userSlice'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom'

import './login.css'


function Login() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login] = useLoginMutation()
  const {userInfo} = useSelector(state => state.user)

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  }, [userInfo, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap
      dispatch(setCred({...res}))
      navigate('/')
    } catch (err) {
      setError(err.data.message)
    }
  };
  return (
    <div className="signin-complete">
      <div className="signup">Welcome! Log In</div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
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
          {/* <span>{isLoading && <span>Loading</span>}</span> */}
          <div style={{color:"red"}} className="theerror">{error}</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
