import { NavLink } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <div>
      <div className="the-footer-path">
        <div className="date-up-register">
          <p>FlashNEWS</p>
          <div className="subscribeto-dateup">Subscribe for our daily news</div>
          <div className="little-content">
            <form action="" method="post">
              <input type="email" name="" id="" placeholder="Email" />
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
        <div className="other-secton">
          <div className="date-up-comm">
            <p>QUICK LINK</p>
            <div className="date-com-list">
              {" "}
              <NavLink to="/Politics"> <li>Business</li></NavLink>
            </div>
            <div className="date-com-list"><NavLink to="/Politics"> <li>Politics</li></NavLink></div>
            <div className="date-com-list"><NavLink to="/Business"> <li>Motivation</li></NavLink></div>
            <div className="date-com-list"><NavLink to="/Travel"> <li>Travel</li></NavLink></div>
            <div className="date-com-list"><NavLink to="/Technology"> <li>Technology</li></NavLink></div>
          </div>
          <div className="date-up-pages">
            <p>PAGES</p>
            <div className="date-com-list"><NavLink to="/"> <li>Home</li></NavLink></div>
            <div className="date-com-list"><NavLink to="/about"> <li>About</li></NavLink></div>
            <div className="date-com-list">Category</div>
            <div className="date-com-list"><NavLink to="/contact"> <li>Contact</li></NavLink></div>
            <div className="date-com-list">
              <span><NavLink to="/feature"> <li>Feature</li></NavLink></span>
            </div>
          </div>
          <div className="date-up-social">
            <p>FOLLOW US</p>
            <div className="media-logo">
              <img src="assets/ins.png" alt="" />
              <div className="smedia">flashNews_community</div>
            </div>
            <div className="media-logo">
              <img src="assets/fb.png" alt="" />
              <div className="smedia">flashNews</div>
            </div>
            <div className="media-logo">
              <img src="asset/linkedin.png" alt="" />
              <div className="smedia">flashNews</div>
            </div>
            <div className="media-logo">
              <img src="assets/twi.png" alt="twitter" />
              <div className="smedia">flashNews</div>
            </div>
            <div className="media-logo">
              <img src="assets/u.png" alt="youtube" />
              <div className="smedia">flashNews_tv</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
