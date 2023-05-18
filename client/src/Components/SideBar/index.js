import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

function SideBar({ userRole }) {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
      >
        {userRole === "admin" && (
          <>
            <Menu.Item key="/" icon={<AppstoreOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="/inventory" icon={<ShopOutlined />}>
              Inventory
            </Menu.Item>
            <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>
              Orders
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
              Customers
            </Menu.Item>
            <Menu.Item key="/register" icon={<UserAddOutlined />}>
              Register
            </Menu.Item>
            <Menu.Item key="/users" icon={<UserAddOutlined />}>
              Users
            </Menu.Item>
          </>
        )}
        {userRole === "manager" && (
          <>
            <Menu.Item key="/" icon={<AppstoreOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="/inventory" icon={<ShopOutlined />}>
              Inventory
            </Menu.Item>
            <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>
              Orders
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
              Customers
            </Menu.Item>
          </>
        )}
        {userRole === "user" && (
          <>
            <Menu.Item key="/" icon={<AppstoreOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
              Customers
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  );
}

export default SideBar;
