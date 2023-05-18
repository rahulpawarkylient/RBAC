import React, { useEffect, useState } from "react";
import { Space, Typography, Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomers() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [setCustomerData] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/customer/${id}`
        );
        form.setFieldsValue(response.data); // Use setFieldsValue to set form data
        setCustomerData(response.data); // Update customerData state
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
    // eslint-disable-next-line
  }, [id, form]);

  const onFinishHandler = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/customer/${id}`,
        values
      );
      if (response.status === 200) {
        navigate("/customers");
        message.success(response.data.message);
      }
      console.log("Updated customer data:", response.data);
    } catch (error) {
      console.error("Error updating customer data:", error);
    }
  };

  return (
    <div>
      <Space size={5} direction="vertical">
        <Typography.Title level={4}>Edit Customers</Typography.Title>
        <Form layout="horizontal" onFinish={onFinishHandler} form={form}>
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[
              { required: true, message: "Please input your Last Name!" },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your Address!" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Space>
    </div>
  );
}

export default EditCustomers;
