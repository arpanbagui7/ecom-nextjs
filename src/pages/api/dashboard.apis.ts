import { categoryRes, productRes, viewProductRes } from "@/Interface";
import axios from "axios";

export const fetchCategory = async (): Promise<categoryRes[]> => {
  const headersList = {
    "Content-Type": "application/json",
  };
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/category`,
      method: "GET",
      headers: headersList,
    })
    .then((res) => res.data);
};

export const fetchProduct = async (
  categoryId: string
): Promise<productRes[]> => {
  const headersList = {
    "Content-Type": "application/json",
  };
  let url = `${process.env.NEXT_PUBLIC_BASEURL}/product`;
  if (categoryId !== "all") {
    url += `?category=${categoryId}`;
  }
  return await axios
    .request({
      url: url,
      method: "GET",
      headers: headersList,
    })
    .then((res) => res.data);
};

export const fetchProductById = async (
  productId: string
): Promise<viewProductRes> => {
  const headersList = {
    "Content-Type": "application/json",
  };
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/product/${productId}?category=true`,
      method: "GET",
      headers: headersList,
    })
    .then((res) => res.data);
};
