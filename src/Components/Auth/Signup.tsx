import React from "react";
import { Button, Card, Divider, Form, Input, Typography, message } from "antd";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import styles from "@/styles/Home.module.css";
import { authProps, authReq } from "@/Interface";
import { signup } from "@/pages/api";

const Signup: React.FC<authProps> = ({ setExistedUser }): JSX.Element => {
  const key = "signup";
  const initialValues = {
    email: "",
    password: "",
  };
  const router = useRouter();

  const { Text, Link } = Typography;
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate, isLoading, isError, isSuccess, error, data } = useMutation({
    mutationFn: (reqData: authReq) => signup(reqData),
  });

  if (isLoading) {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
  } else if (isError) {
    if (error instanceof AxiosError) {
      if (error.response) {
        messageApi.open({
          key,
          type: "error",
          content: Array.isArray(error.response.data?.message)
            ? error.response.data.message[0]
            : error.response.data.message || "Something went wrong",
        });
      } else {
        messageApi.open({
          key,
          type: "error",
          content: error.message || "Something went wrong",
        });
      }
    } else {
      messageApi.open({
        key,
        type: "error",
        content: "Something went wrong",
      });
    }
  } else if (isSuccess) {
    localStorage.setItem("access_token", data.access_token);
    router.push("/dashboard");
  }

  const handleSubmit = (reqData: authReq) => {
    mutate(reqData);
  };
  return (
    <>
      {contextHolder}
      <Card title='Sign Up' className={`${styles.authCard}`}>
        <Form
          layout='vertical'
          colon={false}
          labelAlign='left'
          name='signup'
          initialValues={initialValues}
          onFinish={handleSubmit}>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: "Please enter your email" }]}>
            <Input placeholder='Enter your email' />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password placeholder='Enter your password' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <Text>Existing user? </Text>{" "}
        <Link onClick={() => setExistedUser(true)}>Sign In</Link>
      </Card>
    </>
  );
};

export default Signup;
