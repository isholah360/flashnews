import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Crypto } from "../index.js";
import Atlet from "../resultPage/resultPage.jsx";

function Category() {
  const cate = useParams();

  return (
    <>
      {cate.category === "Cryptocurrency" ? (
        <Crypto />
      ) : cate.category === "Business" ? (
        <Crypto />
      ) : cate.category === "Fashion" ? (
        <Crypto/>
      ) : cate.category === "Travel" ? (
        <Crypto />
      ) : cate.category === "Politic" ? (
        <Crypto />
      ) : cate.category === "Sport" ? (
        <Crypto />
      ) : cate.category === "Marketing" ? (
        <Crypto />
      ) : cate.category === "Lifestyle" ? (
        <Crypto />
      ) : cate.category === "Technology" ? (
        <Crypto />
      ) : (
        ""
      )}
    </>
  );
}

export default Category;
