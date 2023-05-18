import React, { useState } from "react";
import "./Register.css";
import { Button, Form, Input, message, Select, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { Option } = Select;
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false); // State to control loading state

  const onFinishHandler = async (values, form) => {
    setLoading(true); // Set loading to true when submitting the form
    try {
      const response = await axios.post(
        "http://localhost:9000/api/register",
        values
      );
      if (response.status === 201) {
        message.success(response.data.message);
        navigate("/users")
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
          className="register-form-container"
          layout="vertical"
          onFinish={onFinishHandler}
          onFinishFailed={onFinishFailedHandler}
        >
          <h2>Register Form is Here!</h2>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input type="text" />
          </Form.Item>
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
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select placeholder="Select a role">
              <Option value="admin">Admin</Option>
              <Option value="manager">Manager</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form>
      </Spin>
    </>
  );
};

export default Register;
