"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utilies/store";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


const Price = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const { addToCart } = useCartStore();

  useEffect(()=>{
    useCartStore.persist.rehydrate()
  },[])

  useEffect(() => {
    if (product.options?.length) {
      setTotal(
        quantity * product.price + product.options[selected].additionalPrice
      );
    }
  }, [quantity, selected, product]);

  const handleCart = ()=>{
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }),
      quantity: quantity,
    })
    toast.success("The product added to the cart!")
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-[#00DCDC]">{total}/-</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length &&
          product.options?.map((option, index) => (
            <button
              key={option.title}
              className="min-w-[6rem] p-2 ring-1 ring-teal-400 rounded-md"
              style={{
                background: selected === index ? "#00DCDC" : "white",
                color: selected === index ? "white" : "#00DCDC",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-teal-500">
          <span className="text-[#00DCDC]">Quantity</span>
          <div className="flex gap-4 items-center">
            <button
            className="text-[#00DCDC]"  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span className="text-[#00DCDC]">{quantity}</span>
            <button
            className="text-[#00DCDC]"  onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button
          className="uppercase w-56 bg-teal-500 text-white p-3 ring-1 ring-teal-500"
          onClick={handleCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
