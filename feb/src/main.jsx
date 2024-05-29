import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./page/home/home.jsx";
import SinglePost from "./page/post/singlePost.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Posts from "./page/posting/posts.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
  
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/post" element={<Posts />}/>
      </Route>
  
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
