import React, { useState } from "react";
import "./login.css";
import { Button, Form, Input, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to control loading state

  const onFinishHandler = async (values) => {
    setLoading(true); // Set loading to true when submitting the form
    try {
      const response = await axios.post(
        "http://localhost:9000/api/login",
        values
      );
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        message.success(response.data.message);
        navigate("/");
        window.location.reload();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        message.error(error.response.data.message);
      } else {
        console.error(error);
        message.error("Something went wrong");
      }
    } finally {
      setLoading(false); // Set loading back to false after the request is completed
    }
  };

  const onFinishFailedHandler = (errorInfo) => {
    console.error(errorInfo);
    message.error("Please fill in all required fields");
  };

  return (
    <>
      <Spin spinning={loading}>
        {" "}
        {/* Wrap the login form with Spin component */}
        <Form
          className="login-form-container"
          layout="vertical"
          onFinish={onFinishHandler}
          onFinishFailed={onFinishFailedHandler}
        >
          <h2>Login Form is Here!</h2>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password type="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </Spin>
    </>
  );
};

export default Login;
