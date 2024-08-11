const Bloger = require("../db/bloger");
const Post = require("../db/posts");
const User = require("../db/userdb");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middle/error");
const bcryptjs = require("bcryptjs");

//admin auth api

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await Bloger.findOne({ email });
    console.log(user);
    if (user) return next(errorHandler(404, "user already exist"));

    if (username && password && email) {
      const hashedPs = bcryptjs.hashSync(password, 10);
      const newUser = await Bloger.create({
        username,
        password: hashedPs,
        email,
      });
      const { password: hashedPassword, ...response } = newUser._doc;
      return res
        .status(201)
        .json(`user with email:${response.email} has been created`);
    }
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Bloger.findOne({ email });
    if (!user) return res.status(400).json({ message: "wrong credential" });

    const correctPs = bcryptjs.compareSync(password, user.password);
    if (!correctPs) return next(errorHandler(404, "wrong credential"));

    const secreteCode = process.env.SECRETE_CODE;

    const { password: hashedPs, ...resp } = user._doc;
    const token = jwt.sign({ userId: user._id }, secreteCode);
    res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 1000,
      })
      .status(200)
      .json(resp);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const updateProfile = await Bloger.findByIdAndUpdate(
      userId,
      {
        $set: {
          email: req.body.email,
          username: req.body.username,
          name: req.body.name,
          price: req.body.price,
          niche: req.body.niche,
          loyal: req.body.loyal,
          creative: req.body.creative,
          passive: req.body.passive,
          introvert: req.body.introvert,
          convenience: req.body.convenience,
          mile: req.body.mile,
          speed: req.body.speed,
          comfort: req.body.comfort,
          bio: req.body.bio,
          frustration: req.body.frustration,
          age: req.body.age,
          status: req.body.status,
          location: req.body.location,
          tags: req.body.tags,
          goal: req.body.goal,
          quote: req.body.quote,
        },
      },
      { new: true }
    );
    const { password: hashedPassword, ...newUpdte } = updateProfile._doc;
    res.status(200).json(newUpdte);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

const findUser = async (req, res, next) => {
  try {
    const findAcc = await Bloger.find();

    res.status(200).json(findAcc);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

// const userProfs = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     console.log(userId)
//     const user = await Bloger.findById(userId);

//     res.status(200).json(user);
//   } catch (error) {
//     console.log(error); // Log the actual error object
//     return res.status(500).json("Internal Server Error");
//   }
// };

const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id)
      return next(404, "You're not authorise to update");

    const userId = req.params.id;

    const deleteAcc = await Bloger.findByIdAndDelete(userId);

    res.status(200).json(`${deleteAcc} is deleted successfully`);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("jwt", { sameSite: "strict", secure: true })
      .status(200)
      .json("logout successfully");
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

// post api
const makePost = async (req, res, next) => {
  try {
    console.log(req.user.userId);
    const user = await Bloger.findById(req.user.userId);
    const { title, body, category, newsPhoto } = req.body;

    const post = await Post.findOne({ title });
    console.log({ user: user._id, photo: user.profilePhoto });
    const author = user.name;
    const authorPhoto = user.profilePhoto;
    if (post) return next(errorHandler(404, "Post already exist"));

    if (title && body && category) {
      const newUser = await Post.create({
        title,
        body,
        category,
        newsPhoto,
        author,
        authorPhoto,
      });
      return res.status(201).json(`post has been created succefully`);
    }
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal server error");
  }
};
// findpost limit 5
const Posts = async (req, res, next) => {
  try {
    const post = await Post.find({}).sort({ createdAt: -1 }).limit(10);
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};
// findpost limit 5
const fourPost = async (req, res, next) => {
  try {
    const post = await Post.find({
      category: { $in: ["Politics", "Business"] },
    })
      .sort({ createdAt: -1 })
      .limit(4);
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};
// All Posts
const allPost = async (req, res, next) => {
  const { search } = req.query;

  try {
    const query = {};
    if (search) {
      // Use $or to search across multiple fields
      query.$or = [
        { title: { $regex: new RegExp(search, 'i') } },
        { author: { $regex: new RegExp(search, 'i') } },
        { category: { $regex: new RegExp(search, 'i') } }
      ];
    }
    
    const post = await Post.find(query).sort({ createdAt: -1 }).limit();
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

// All custom
const customPost = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const customing = req.query.customing;
    console.log(customing);

    const startIndex = (page - 1) * limit;
    const total = await Post.countDocuments({ category: customing });

    const posts = await Post.find({ category: customing })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    // const post = await Post.find({}).sort({ createdAt: -1 }).limit();
    if (posts)
      return res.status(200).json({
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        posts,
      });
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

// One Posts tech
const lifeOne = async (req, res, next) => {
  try {
    const post = await Post.find({ category: "Lifestyle" })
      .sort({ createdAt: -1 })
      .limit(1);
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};
// Four Posts tech
const lifeFour = async (req, res, next) => {
  try {
    const post = await Post.find({ category: "Lifestyle" })
      .sort({ createdAt: -1 })
      .skip(1)
      .limit(4);
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};
// latestNew
const latestNews = async (req, res, next) => {
  try {
    const post = await Post.find({
      category: { $in: ["Politics", "Business", "Technology", "LifeStyle"] },
    })
      .sort({ createdAt: -1 })
      .limit(5);
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

// One Posts tech
const techOne = async (req, res, next) => {
  try {
    const post = await Post.find({ category: "Technology" })
      .sort({ createdAt: -1 })
      .limit(1);
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};
// Four Posts tech
const techFour = async (req, res, next) => {
  try {
    const post = await Post.find({ category: "Technology" })
      .sort({ createdAt: -1 })
      .skip(1)
      .limit(4);
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

// One Posts travel
const travelOne = async (req, res, next) => {
  try {
    const post = await Post.find({ category: "Travel" })
      .sort({ createdAt: -1 })
      .limit(1);
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};
// Four Posts travel
const travelFour = async (req, res, next) => {
  try {
    const post = await Post.find({ category: "Travel" })
      .sort({ createdAt: -1 })
      .skip(1)
      .limit(4);
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

// Four Posts sport
const sportNews = async (req, res, next) => {
  try {
    const post = await Post.find({ category: "Sport" })
      .sort({ createdAt: -1 })
      .limit();
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

// cryptocurrency poss

const crypto = async (req, res, next) => {
  try {
    const post = await Post.find({ category: "Cryptocurrency" })
      .sort({ createdAt: -1 })
      .limit(1);
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};
// Four Posts travel
const cryptoFour = async (req, res, next) => {
  try {
    const post = await Post.find({ category: "Cryptocurrency" })
      .sort({ createdAt: -1 })
      .skip(1)
      .limit(4);
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

// Four Posts travel
const Business = async (req, res, next) => {
  try {
    const post = await Post.find({
      category: { $in: ["Business", "Marketing"] },
    })
      .sort({ createdAt: -1 })
      .skip()
      .limit();
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

const entertain = async (req, res, next) => {
  try {
    const post = await Post.find({
      category: { $in: ["Entertainment", "Fashion", "Movies"] },
    })
      .sort({ createdAt: -1 })
      .skip()
      .limit();
    if (post) return res.status(200).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

//single post
const findPost = async (req, res) => {
  try {
    const { title } = req.params;
    
    if (!title) {
      return res.status(400).json({ error: "Post title is required" });
    }
    const post = await Post.findOne({ 
      title: { $regex: new RegExp('^' + title + '$', 'i') } 
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error('Error in findPost:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


/* Category */

const categoryPost = async (req, res, next) => {
  try {
    category = req.params.category;
    const post = await Post.find({ category: category });
    if (!post) return next(errorHandler(404, "post does not exist"));
    return res.status(201).json(post);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const postUpd = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title: req.body.title,
          body: req.body.body,
          category: req.body.category,
        },
      },
      { new: true }
    );

    res.status(200).json(postUpd);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const deleteAcc = await Post.findByIdAndDelete(postId);

    res.status(200).json(`post is deleted successfully`);
  } catch (error) {
    console.log(error); // Log the actual error object
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  register,
  login,
  update,
  logout,
  deleteUser,
  makePost,
  updatePost,
  deletePost,
  findPost,
  Posts,
  findUser,
  fourPost,
  allPost,
  techFour,
  techOne,
  travelOne,
  travelFour,
  lifeOne,
  customPost,
  lifeFour,
  sportNews,
  Business,
  crypto,
  cryptoFour,
  entertain,
  categoryPost,
  latestNews,
};
