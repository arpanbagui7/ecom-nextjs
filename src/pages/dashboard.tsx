import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Category from "@/Components/Dashboard/Category";
import Product from "@/Components/Dashboard/Product";
import { NextPage } from "next";
import { Col, Row, Space, Spin, Typography } from "antd";
import HorizontalMenu from "@/Components/Common/HorizontalMenu";
import { useQuery } from "@tanstack/react-query";
import { fetchCategory, fetchProduct } from "./api";
import { AxiosError } from "axios";
import Error from "@/Components/Common/Error";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/");
    }
  }, []);

  const {
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    isSuccess: isCategorySuccess,
    data: category,
    error: categoryError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: isProductLoading,
    isError: isProductError,
    data: product,
    error: productError,
  } = useQuery({
    queryKey: ["product", selectedCategory],
    queryFn: () => fetchProduct(selectedCategory),
    refetchOnWindowFocus: false,
    enabled: !!isCategorySuccess,
  });

  if (isCategoryLoading || isProductLoading) {
    return (
      <div className='center' style={{ minHeight: "100dvh" }}>
        <Space size='middle'>
          <Spin />
        </Space>
      </div>
    );
  }

  if (isCategoryError || isProductError) {
    const error = categoryError ?? productError;
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
        <Row gutter={16}>
          <Col className='m-1' span={24}>
            
            <Category
              categories={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Col>
          <Col span={24}>
            <Product products={product} />
          </Col>
        </Row>
      </HorizontalMenu>
    </>
  );
};

export default Dashboard;
