import { Typography, Avatar, Spin, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Customer.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ViewCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/customer/${id}`
        );
        setCustomer(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) {
    return <Spin size="large" />;
  }

  const handleBack = () => {
    navigate("/customers");
  };

  return (
    <div className="customer-details">
      <Tooltip title="Back">
        <ArrowLeftOutlined onClick={handleBack} style={{ cursor: "pointer" }} />
      </Tooltip>
      <Typography.Title className="title" level={4}>
        Customer Details
      </Typography.Title>
      <div className="details-container">
        <Avatar className="avatar" src={customer.profilepic} size={128} />
        <div className="info">
          <Typography.Title className="name" level={5}>
            {customer.firstname} {customer.lastname}
          </Typography.Title>
          <Typography.Text className="text">
            <span>Email:</span> {customer.email}
          </Typography.Text>
          <Typography.Text className="text">
            <span>Address:</span> {customer.address}
          </Typography.Text>
          <Typography.Text className="text">
            <span>Phone:</span> {customer.phone}
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
