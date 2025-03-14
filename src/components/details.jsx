import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

export default function Details() {
  const params = useParams();

  const [data, setData] = useState();
  const [dataCategory, setDataCategory] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://dummyjson.com/products/${params.id}`);
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchDataProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${data?.category}`
      );

      setDataCategory(
        res.data.products.filter((product) => product.id != params.id)
      );
    } catch (e) {
      // console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataProduct();
  }, [data, params]);

  const Clicked = () => {
    toast.success(`GOOOOD! Clicked`);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <ClimbingBoxLoader color="grey" size={20} />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Market</h1>
      <hr />

      <div className="flex jsutify-between max-md:flex-col">
        <div className="w-1/2 max-md:w-full max-md:flex max-md:justify-center max-md:items-center">
          <img className="w-3/4" src={data?.images?.[0]} alt={data?.title} />
        </div>
        <div className="w-1/2 flex flex-col max-md:w-full">
          <h2 className="mt-5 font-semibold text-xl text-left mb-5">
            {data?.title}
          </h2>
          <p className="grow-1 text-left">{data?.description}</p>
          <div className="flex bg-gray-300 justify-between !px-4 h-16 items-center rounded !my-4">
            <p className="font-bold">${data?.price}</p>
            <p className="italic"> #{data?.category}</p>
          </div>
          <button onClick={() => Clicked()}>Add to Cart</button>
        </div>
      </div>

      <hr />

      {dataCategory &&
        dataCategory.map((movie) => {
          return (
            <Link to={`/detail/${movie.id}`} className="content" key={movie.id}>
              <p className="h-18 line-clamp-2">{movie.title}</p>
              <img
                className="cart mb-3"
                src={movie.images?.[0]}
                alt={movie.title}
              />
              <span className="line-clamp-3 text-justify !my-3">
                {movie.description}
              </span>
              <div className="flex justify-between">
                <h2 className="font-bold ">${movie.price}</h2>
                <h2 className="font-semibold italic">#{movie.category}</h2>
              </div>
            </Link>
          );
        })}

      <ToastContainer />
    </div>
  );
}
