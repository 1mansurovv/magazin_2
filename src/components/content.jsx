import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClimbingBoxLoader } from "react-spinners";
import { Link } from "react-router-dom";

export default function Contect() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://dummyjson.com/products");
      console.log(res.data);
      setData(res.data.products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center border">
        <ClimbingBoxLoader color="grey" size={20} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Market</h1>
      <hr />
      {data &&
        data.map((movie) => {
          return (
            <Link to={`/detail/${movie.id}`} className="content" key={movie.id}>
              <p className="h-18 line-clamp-1">{movie.title}</p>
              <img
                className="cart mb-3"
                src={movie.images?.[0]}
                alt={movie.title}
              />
              <span className="line-clamp-3 text-justify my-3 text-lg">
                {movie.description}
              </span>
              <div className="flex justify-between">
                <h2 className="font-bold ">${movie.price}</h2>
                <h2 className="font-semibold italic">#{movie.category}</h2>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
