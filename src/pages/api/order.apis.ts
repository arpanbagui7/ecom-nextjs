import { getOrderRes } from "@/Interface";
import axios from "axios";

export const fetchOrders = async (): Promise<getOrderRes[]> => {
  const authToken = localStorage.getItem("access_token");
  const headersList = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/order`,
      method: "GET",
      headers: headersList,
    })
    .then((res) => res.data);
};
