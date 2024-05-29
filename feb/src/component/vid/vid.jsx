import "./vid.css";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function VideFile() {
  return (
    <div>
      <div className="vid-section">
        <div className="mostview">
          <div>
            <hr className="thehr" />
          </div>{" "}
          <span>Videos</span>
        </div>
        <div className="video-grid">
          <div className="vidgrid-one">
            <div className="first-vid ">
              <img src="assets/adssh.jpg" alt="" />
              <div className="vid-over">
                <div className="over-contnt">
                  <div className="categ">
                    <span>Travel </span>
                  </div>
                  <div className="vidtitle">
                    The Destinations Around The World Open...
                  </div>
                </div>
                <div className="video-log">
                  <img src="assets/u.png" alt="youtube" />
                </div>
              </div>
            </div>
            <div className="first-vid firstvid-sec">
              <img src="assets/tech.jfif" alt="" />
              <div className="vid-over">
                <div className="over-contnt">
                  <div className="categ">
                    <span>Technology </span>
                  </div>
                  <div className="vidtitle">
                    The Destinations Around The World Open...
                  </div>
                </div>
                <div className="video-log">
                  <img src="assets/u.png" alt="youtube" />
                </div>
              </div>
            </div>
          </div>
          <div className="vidgrid-two">
            <div className="first-vid vidgrid--two">
              <img src="assets/int2.jpg" alt="" />
              <div className="vid-over">
                <div className="over-contnt">
                  <div className="categ third">
                    <span>Investemnt</span>
                  </div>
                </div>
                <div className="video-log">
                  <img src="assets/u.png" alt="youtube" />
                </div>
              </div>
              <div className="gridtwo--title">
                The Destinations Around The World Open...
              </div>
              <div className="bus-auth-coment">
                <div className="">by Tunrayo duro</div>
                <div className="like-comment">
                  <div className="vid-like like-one">
                    <img
                      className="like-one-img"
                      src="assets/like.png"
                      alt=""
                    />
                    <span
                      style={{
                        margin: "0 -.5rem",
                        fontSize: ".9rem",
                        paddingTop: ".05rem",
                      }}
                    >
                      {getRandomInt(10, 100)}
                    </span>
                  </div>
                  <div className="vid-like">
                    <img
                      style={{ marginLeft: "1.2rem" }}
                      src="assets/com.png"
                      alt=""
                    />
                    <span
                      style={{
                        margin: "0 -.5rem",
                        fontSize: ".9rem",
                        paddingTop: ".05rem",
                      }}
                    >
                      {getRandomInt(5, 50)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideFile;
