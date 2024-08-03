const express = require("express");
const {
  register,
  login,
  update,
  deleteUser,
  logout,
  deletePost,
  makePost,
  findPost,
  Posts,
  updatePost,
  findUser,
  fourPost,
  allPost,
  limitOne,
  limitFour,
  techOne,
  techFour,
  travelOne,
  travelFour,
  lifeOne,
  lifeFour,
  sportNews,
  Business,
  crypto,
  cryptoFour,
  entertain,
  categoryPost,
  customPost,
  latestNews,
} = require("../controller/controller");
const protectPage = require("../middle/protect");
const { user } = require("../controller/userController");
const router = express.Router();

/*User or Blogger routes*/

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/:id", protectPage, update);
router.delete("/:id", protectPage, deleteUser);
router.get("/users/:id", findUser);
router.get("/profile/:id", user);


/*Blogs routes*/
router.post("/post", protectPage, makePost);
router.get("/blogs", Posts);
router.get("/four", fourPost);
router.get("/techone", techOne);
router.get("/techfour", techFour);
router.get("/travelone", travelOne);
router.get("/travelfour", travelFour);
router.get("/sport", sportNews);
router.get("/business", Business);
router.get("/crypto", crypto);
router.get("/cryptofour", cryptoFour);
router.get("/lifeone", lifeOne);
router.get("/lifefour", lifeFour);
router.get("/entertainment", entertain);
router.get("/all", allPost);
router.get("/latest", latestNews);
router.get("/custom", customPost);
router.get("/blogs/:id", findPost);
router.get("/:category", categoryPost);
router.get("/users", findUser);
router.put("/blogs/:id", protectPage, updatePost);
router.delete("/blogs/:id", protectPage, deletePost);

module.exports = { router };
