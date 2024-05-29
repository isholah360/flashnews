import "./busads.css";


function SpAds() {
  return (
    <div className="busi-ads">
      <div className="mostview">
            <div>
              <hr className="thehr" />
            </div>{" "}
            <span>News Letter</span>
          </div>
      <div className="sub-letter">
          <span>JOIN OUR NEWSLETTER</span>
          <div>Sign up for our newsletter to recevie updates</div>
          <img src="assets/letter.jpg" alt="" />
          <input type="email" name="" id="" placeholder="Enter your email"/>
          <button>SUBSCRIBE</button>
      </div>
      <div className="sec-adsig">
        <img src="assets/adssh.jpg" alt="" />
      </div> 
    </div>
  );
}

export default SpAds;
