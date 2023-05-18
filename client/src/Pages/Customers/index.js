import {
  Avatar,
  Input,
  Space,
  Table,
  Typography,
  Modal,
  Button,
  Form,
  message,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Search } = Input;

function Customers({ userRole }) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [form] = Form.useForm();

  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      const customerResponse = await axios.get(
        "http://localhost:9000/api/customer",
        { params: { email: searchQuery } }, // Use 'name' instead of 'search' as the query parameter
        { params: { firstname: searchQuery } }, // Use 'name' instead of 'search' as the query parameter
        { params: { lastname: searchQuery } } // Use 'name' instead of 'search' as the query parameter
      );
      setDataSource(customerResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };
  useEffect(() => {
    fetchCustomerData();
    // eslint-disable-next-line
  }, [searchQuery]);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const onFinishHandler = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:9000/api/customer",
        values
      );
      message.success(response.data.message);
      form.resetFields();
      fetchCustomerData();
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteProduct = async (_id) => {
    if (window.confirm("Are you sure You want to delete this customer....")) {
      const response = await axios.delete(
        `http://localhost:9000/api/customer/${_id}`
      );
      if (response.status === 200) {
        message.success(response.data.message);
        fetchCustomerData();
      }
    }
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Customers</Typography.Title>
      <Search
        placeholder="Search customers"
        onSearch={handleSearch}
        style={{ width: 200 }}
      />
      <Space wrap>
        {(userRole === "admin" || userRole === "manager") && (
          <Button onClick={() => setModalOpen(true)}>
            <PlusCircleOutlined /> ADD
          </Button>
        )}
        <Modal
          title="Add Your Customers"
          centered
          open={modalOpen}
          footer={null}
          onCancel={() => setModalOpen(false)}
        >
          <Form layout="vertical" onFinish={onFinishHandler} form={form}>
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form>
        </Modal>
      </Space>
      <Table
        loading={loading}
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "First Name",
            dataIndex: "firstname",
          },
          {
            title: "Last Name", // Corrected spelling of "Last Name"
            dataIndex: "lastname",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },
          {
            title: "Address",
            dataIndex: "address",
          },
          {
            title: "Actions",
            dataIndex: "_id",
            render: (_id) => (
              <Space>
                <Link to={`/customers/viewcustomers/${_id}`}>
                  <EyeOutlined />
                </Link>

                {userRole === "admin" && (
                  <>
                    <Link to={`/customers/editcustomers/${_id}`}>
                      <EditOutlined />
                    </Link>
                    <Link to={"#"} onClick={() => onDeleteProduct(_id)}>
                      <DeleteOutlined />
                    </Link>
                  </>
                )}
                {userRole === "manager" && (
                  <>
                    <Link to={`/customers/editcustomers/${_id}`}>
                      <EditOutlined />
                    </Link>
                  </>
                )}
              </Space>
            ),
          },
        ]}
        dataSource={dataSource.map((item) => ({ ...item, key: item._id }))}
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
  );
}

export default Customers;
