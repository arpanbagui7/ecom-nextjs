import { useState } from "react";
import { NextPage } from "next";
import { Layout } from "antd";
import Login from "@/Components/Auth/Login";
import Signup from "@/Components/Auth/Signup";
import styles from "@/styles/Home.module.css";

const Index: NextPage = () => {
  const [isExistedUser, setExistedUser] = useState(false);
  return (
    <>
      <Layout className={styles.fullpage}>
        <Layout.Content className='center'>
          {isExistedUser ? (
            <Login setExistedUser={setExistedUser} />
          ) : (
            <Signup setExistedUser={setExistedUser} />
          )}
        </Layout.Content>
      </Layout>
    </>
  );
};

export default Index;
