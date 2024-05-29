import "./header.css";

function Header() {
  const mydte = new Date().toUTCString().slice(0, 16);
  return (
    <div>
      <div className="time-date">
        <div className="thedate">{mydte}</div>
        <div className="login-re">
          <ul>
            <li>About</li>
            <li>Career</li>
            <li>Register/Login</li>
            <li>
              <div className="soc">
                <img className="medi" src="" alt="" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
