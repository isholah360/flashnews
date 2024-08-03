import { useEffect, useState } from "react";
import gsap from "gsap";
import "./navbar.css";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      gsap.to(".nvbr ul", {
        duration: 0.5,
        height: 0,
        opacity: 0,
        alignItems: "flex-start",
        display: "none",
      });
      // gsap.set('.nvbr ul', { duration: 0.5, height: 0, opacity: 1,  });
    } else {
      gsap.set(".nvbr ul", {
        display: "flex",
        opacity: 0,
        width: "40%",
        height: "80vh",
      });
      gsap.to(".nvbr ul", { duration: 0.5, height: "80vh", opacity: 1 });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769) {
        // Reset styles for desktop view
        gsap.set(".nvbr ul", {
          display: "flex",
          opacity: 1,
          height: "auto",
          marginRight: "-8rem",
        });
      } else if (window.innerWidth <= 769) {
        // Reset styles for desktop view
        gsap.set(".nvbr ul", {
          display: "none",
          opacity: 0,
          height: "auto",
          marginRight: "0rem",
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="nvbr">
        <div className="logo">FlashNews</div>
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>
        <ul className={isMenuOpen ? "active" : ""}>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="#">
            <li>Page</li>
          </Link>
          <Link to="/register">
            <li>Feature</li>
          </Link>
          <Link to="">
            <li className="nested-categ">
              Category
              <div className="nestedlist">
                <NavLink to="/Politics"> <li>Politics</li></NavLink>
                <NavLink to="/Business"> <li>Business</li></NavLink>
                <NavLink to="/Fashion"> <li>Fashion</li></NavLink>
                <NavLink to="/Sport"> <li>Sport</li></NavLink>
                <NavLink to="/Lifestyle"> <li>Lifestyle</li></NavLink>
                <NavLink to="/Cryptocurrency"> <li>Crypto</li></NavLink>
                <NavLink to="/Technology"> <li>Tech</li></NavLink>
              </div>
            </li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
          <Link to="/about">
            <li className="mobile-show">About</li>
          </Link>
          <Link to="/career">
            <li className="mobile-show">Career</li>
          </Link>
          <div className="mobile-show  mobile-logins">
            {userInfo ? (
              <li>Logout</li>
            ) : (
              <Link to="/login">
                <li>Login</li>
              </Link>
            )}
            {userInfo ? (
              ""
            ) : (
              <Link to="/register">
                <li style={{ marginLeft: "1.5rem" }}>Register</li>
              </Link>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
