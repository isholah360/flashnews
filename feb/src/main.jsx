import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import SinglePost from "./page/post/singlePost.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Posts from "./page/posting/posts.jsx";
import { About, Contact, Home, Category, Login, Career} from "./page/index.js";
import { store } from "./component/redux/store.js";
import { Provider } from "react-redux";
import Reg from "./page/register/reg.jsx";
import UserProfile from "./page/profile/userProfile.jsx";
import EditProfile from "./page/profile/editProfile.jsx";
import ProtectRoute from "./component/protectRoute/protectRoute.jsx";
import PublicProfile from "./component/protectRoute/publicProfile.jsx";
import ResultsPage from "./page/resultPage/resultPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Reg />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/post/blogs/:title" element={<SinglePost />} />
      <Route path="/:category" element={<Category />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/post" element={<Posts />} />
      <Route path="/profile" element={<PublicProfile />} />
      <Route path="/career" element={<Career />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="" element={<ProtectRoute />}>
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/edit/:id" element={<EditProfile />} />
      </Route>
     
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
