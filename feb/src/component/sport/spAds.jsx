import "./sport.css";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function SpAdsz({adImage}) {
  return (
    <div>
      <div className="social-media">
        <div className="letcnnect">LET'S HANG OUT ON SOCIAL</div>
        <div className="fb">
          <img className="social-med" src="assets/fb.png" alt="" />
          <div className="follower">
            <div className="folo-name">Facebook</div>
            <div>{getRandomInt(10000, 250000)}</div>
          </div>
        </div>
        <div
          className="fb"
          style={{ margin: ".8rem 0", background: "#55acee" }}
        >
          <img
            className="twi"
            style={{
              padding: ".3rem .2rem .3rem .3rem",
            }}
            src="assets/twi.png"
            alt=""
          />
          <div className="follower">
            <div className="folo-name">Twitter</div>
            <div>{getRandomInt(10000, 250000)}</div>
          </div>
        </div>
        <div
          className="fb"
          style={{ margin: ".8rem 0", background: "#c61d23" }}
        >
          <img
            className="twi"
            style={{
              padding: ".3rem .2rem .3rem .3rem",
            }}
            src="assets/u.png"
            alt=""
          />
          <div className="follower">
            <div className="folo-name">Youtube</div>
            <div>{getRandomInt(10000, 250000)}</div>
          </div>
        </div>
        <div
          className="fb"
          style={{ margin: ".8rem 0", background: "#e1306c" }}
        >
          <img
            className="twi"
            style={{
              padding: ".3rem .2rem .3rem .5rem",
            }}
            src="assets/ins.png"
            alt=""
          />
          <div className="follower">
            <div className="folo-name">Instagram</div>
            <div>{getRandomInt(10000, 250000)}</div>
          </div>
        </div>
      </div>
      <div className="tags">
        <div className="the-cat">Fashion</div>
        <div className="the-cat">Business</div>
        <div className="the-cat">Marketing</div>
        <div className="the-cat">Travel</div>
        <div className="the-cat">Lifestyle</div>
        <div className="the-cat">Politics</div>
        <div className="the-cat">Sport</div>
        <div className="the-cat">Crypto</div>
      </div>
      <div className="spg-ads" >
        <img src={adImage} alt="" />
      </div>
    </div>
  );
}

export default SpAdsz;
