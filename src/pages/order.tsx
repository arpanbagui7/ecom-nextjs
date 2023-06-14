import HorizontalMenu from "@/Components/Common/HorizontalMenu";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import React from "react";
import { fetchOrders } from "./api/order.apis";
import { Space, Spin } from "antd";
import { AxiosError } from "axios";
import Error from "@/Components/Common/Error";
import OrderList from "@/Components/Order/OrderList";

const Order: NextPage = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["order"],
    queryFn: () => fetchOrders(),
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return (
      <div className='center' style={{ minHeight: "100dvh" }}>
        <Space size='middle'>
          <Spin />
        </Space>
      </div>
    );
  } else if (isError) {
    let err = { statusCode: 500, message: "Something went wrong" };
    if (error instanceof AxiosError) {
      if (error.response) {
        err = {
          statusCode: error.status ?? 500,
          message: error.response.data.message || "Something went wrong",
        };
      } else {
        err = {
          statusCode: error.status ?? 500,
          message: error.message || "Something went wrong",
        };
      }
    }
    return <Error err={err} />;
  }
  return (
    <>
      <HorizontalMenu>
        <OrderList orders={data} />
      </HorizontalMenu>
    </>
  );
};

export default Order;
