import { orderListProps, getOrderRes } from "@/Interface";
import { Button, Modal, Table, Typography } from "antd";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";
import { FC, useState, useRef } from "react";
import ViewOrder from "./ViewOrder";

const OrderList: FC<orderListProps> = ({ orders }) => {
  const { Text } = Typography;
  const [modalOpen, setModalOpen] = useState(false);
  const selectedOrder = useRef<getOrderRes | null>(null);
  const columns: ColumnsType<getOrderRes> = [
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => (
        <Text>{dayjs(createdAt).format("DD MMM, YY")}</Text>
      ),
    },
    {
      title: "Order Amount",
      dataIndex: "orderAmt",
      key: "orderAmt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button className='btn-info' onClick={() => handleOrderDetail(record)}>
          Order Detail
        </Button>
      ),
    },
  ];

  const handleOrderDetail = (order: getOrderRes) => {
    selectedOrder.current = order;
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    selectedOrder.current = null;
  };

  return (
    <>
      <Table columns={columns} dataSource={orders} />
      <Modal
        width={1000}
        open={modalOpen}
        footer={null}
        onOk={closeModal}
        onCancel={closeModal}>
        <ViewOrder order={selectedOrder.current} />
      </Modal>
    </>
  );
};

export default OrderList;
