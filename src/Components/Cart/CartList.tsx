import { cartListProps, cartColumns, createOrderReq } from "@/Interface";
import { imageLoader } from "@/common-function";
import { createOrder } from "@/pages/api/cart.apis";
import { useMutation } from "@tanstack/react-query";
import { Button, Space, Spin, Table, Typography, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { AxiosError } from "axios";
import Image from "next/image";
import { FC, useRef } from "react";
import Error from "../Common/Error";

const CartList: FC<cartListProps> = ({ cartItem, setCartItem }) => {
  const key = "createOrder";
  const { Text } = Typography;
  const { Summary } = Table;
  const [messageApi, contextHolder] = message.useMessage();
  const orderAmt = useRef(0);
  const columns: ColumnsType<cartColumns> = [
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (_, { image, name }) => (
        <Image
          loader={imageLoader}
          src={`data:image/jpeg;base64,${image}`}
          alt={name}
          width={100}
          height={100}
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "# Qty",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const { mutate, isLoading, isError, isSuccess, error, data } = useMutation({
    mutationFn: (reqData: createOrderReq) => createOrder(reqData),
  });

  const handlePlaceOrder = () => {
    const reqData = {
      orderAmt: orderAmt.current,
      products: Object.values(cartItem).map(
        ({ productId, price, quantity }) => ({ productId, price, quantity })
      ),
    };
    mutate(reqData);
  };

  if (isLoading) {
    messageApi.open({
      key,
      type: "loading",
      content: "Placing Order...",
    });
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
  } else if (isSuccess) {
    if (setCartItem) {
      messageApi.open({
        key,
        type: "success",
        content: "Order Placed Successfully",
      });
      setTimeout(() => setCartItem({}), 1000);
    }
  }
  return (
    <>
      {contextHolder}
      <Table
        className='m-1'
        columns={columns}
        dataSource={Object.values(cartItem)}
        pagination={false}
        scroll={{ y: 500 }}
        summary={(pageData) => {
          let totalPrice = 0;
          pageData.forEach(({ total }) => {
            totalPrice += total;
          });
          orderAmt.current = totalPrice;
          return (
            <Summary.Row>
              <Summary.Cell index={0} colSpan={4}>
                <Text strong>Total Amount</Text>
              </Summary.Cell>
              <Summary.Cell index={5}>
                <Text strong type='success'>
                  {totalPrice}
                </Text>
              </Summary.Cell>
            </Summary.Row>
          );
        }}
      />
      <div className='center'>
        <Button className='btn-info' onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </>
  );
};

export default CartList;
