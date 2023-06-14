import { cartColumns, orderDetailProps } from "@/Interface";
import { imageLoader } from "@/common-function";
import { Col, Descriptions, Empty, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Image from "next/image";
import { FC } from "react";

const ViewOrder: FC<orderDetailProps> = ({ order }) => {
  if (order) {
    const { createdAt, orderAmt, productOrders } = order;
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

    const data = productOrders.map((productOrder) => {
      const {
        product: { name, image },
        price,
        quantity,
        productId,
      } = productOrder;
      const imageString = image
        ? Buffer.from(image.data).toString("base64")
        : null;
      return {
        name,
        price,
        quantity,
        image: imageString,
        total: price * quantity,
        productId,
      };
    });

    return (
      <>
        <Row gutter={16}>
          <Col span={24}>
            <Descriptions title='Order Detail' layout='horizontal'>
              <Descriptions.Item label='Order Date'>
                {dayjs(createdAt).format("DD MMM, YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label='Order Amount'>
                {orderAmt}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={24}>
            <Table
              className='m-1'
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ y: 500 }}
            />
          </Col>
        </Row>
      </>
    );
  }
  return <Empty />;
};

export default ViewOrder;
