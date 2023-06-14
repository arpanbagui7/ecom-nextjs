import { createOrderReq, createOrderRes } from "@/Interface";
import axios from "axios";

export const createOrder = async (
  req: createOrderReq
): Promise<createOrderRes> => {
  const authToken = localStorage.getItem("access_token");
  const headersList = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  return await axios
    .request({
      url: `${process.env.NEXT_PUBLIC_BASEURL}/order`,
      method: "POST",
      data: JSON.stringify(req),
      headers: headersList,
    })
    .then((res) => res.data);
};
