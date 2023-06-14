import { viewProductProps } from "@/Interface";
import { imageLoader } from "@/common-function";
import { fetchProductById } from "@/pages/api/dashboard.apis";
import { useQuery } from "@tanstack/react-query";
import { Descriptions, Space, Spin, Typography } from "antd";
import { AxiosError } from "axios";
import Image from "next/image";
import { FC } from "react";
import Error from "../Common/Error";

const ViewProduct: FC<viewProductProps> = ({ productId }) => {
  const { Text } = Typography;
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });

  if (isLoading) {
    return (
      <Space size='middle'>
        <Spin />
      </Space>
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
  const {
    name,
    description,
    image,
    price,
    category: { name: categoryName, description: categoryDesc },
  } = data;
  const imageString = image ? Buffer.from(image.data).toString("base64") : null;
  return (
    <>
      <Image
        loader={imageLoader}
        src={`data:image/jpeg;base64,${imageString}`}
        alt={name}
        width={400}
        height={350}
      />
      <Descriptions title={name} column={1}>
        <Descriptions.Item label='Price(₹)'>{price} ₨</Descriptions.Item>
        <Descriptions.Item label='Product Description'>
          {description}
        </Descriptions.Item>
        <Descriptions.Item label='Category Type'>
          {categoryName}
        </Descriptions.Item>
        <Descriptions.Item label='Category Description'>
          {categoryDesc}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default ViewProduct;
