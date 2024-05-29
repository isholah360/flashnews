import "./footer.css";

export default function Footer() {
  return (
    <div>
      <div className="the-footer-path">
      <div className="date-up-register">
          <p>FlashNEWS</p>
          <div className="subscribeto-dateup">
            Subscribe for our daily news
          </div>
          <div className="little-content">
            <form action="" method="post">
                <input type="email" name="" id="" placeholder="Email" />
                <button type="submit">submit</button>
            </form>
          </div>
          
        </div>
        <div className="date-up-comm">
          <p>Quick Link</p>
          <div className="date-com-list"> <span>Marketing</span></div>
          <div className="date-com-list">Politics</div>
          <div className="date-com-list">Motivation</div>
          <div className="date-com-list">Travel</div>
          <div className="date-com-list">Technology</div>
        </div>
        <div className="date-up-pages">
          <p>PAGES</p>
          <div className="date-com-list">Home</div>
          <div className="last">About Us</div>
          <div className="date-com-list">Blog</div>
          <div className="date-com-list">Contact</div>
          <div className="date-com-list"> <span>Feature </span> </div>
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
  );
}
