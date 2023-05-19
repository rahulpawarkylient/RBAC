import { Space, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const ManageUsers = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:9000/api/");
      setDataSource(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const getRoleColor = (role) => {
    if (role === "admin") {
      return "green";
    } else if (role === "manager") {
      return "blue";
    } else if (role === "user") {
      return "red";
    }
    return "black";
  };

  return (
    <Space size={20} direction="vertical" className="spacebox">
      <Typography.Title level={4}>Users</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "No",
            dataIndex: "serial",
            render: (text, record, index) => index + 1,
          },
          {
            title: "Username",
            dataIndex: "username",
          },
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Role",
            dataIndex: "role",
            render: (text) => (
              <span style={{ color: getRoleColor(text) }}>{text}</span>
            ),
          },
        ]}
        dataSource={dataSource.map((item, index) => ({ ...item, key: index }))}
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
  );
};

export default ManageUsers;
