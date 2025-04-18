import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  TeamOutlined,
  IdcardOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
// import './style.css';
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import CustomFooter from "../../Components/Footer";
import NavbarAccount from "../../Pages/Account/NavbarAccount";
import logo from "../../assets/img/logo-no-background.png";
import { WebSocketProvider } from "../../Utils/Websocket/WebsocketContextProvider";

const { Header, Sider, Content } = Layout;

const StoreLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const storeID = useParams();
  const selectedKey = location.pathname.startsWith(`/store/${storeID.id}/zone`)
    ? "1"
    : location.pathname.startsWith(`/store/${storeID.id}/productattribute`)
    ? "4"
    : location.pathname.startsWith(`/store/${storeID.id}/product`)
    ? "2"
    : location.pathname.startsWith(`/store/${storeID.id}/update-info`)
    ? "3"
    : location.pathname.startsWith(`/store/${storeID.id}/category`)
    ? "5"
    : location.pathname.startsWith(`/store/${storeID.id}/package`)
    ? "6"
    : location.pathname.startsWith(`/store-owner/store`)
    ? "7"
    : "";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{
            backgroundColor: "white",
            color: "#fff",
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="demo-logo-vertical" />
          <div
            style={{
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: "60px",
                  width: "auto",
                  maxWidth: collapsed ? "40px" : "120px",
                  transition: "max-width 0.3s ease",
                  cursor: "pointer",
                  visibility: collapsed ? "hidden" : "visible",
                }}
              />
            </Link>
          </div>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={[
              {
                key: "1",
                icon: <ShopOutlined />,
                label: (
                  <Link
                    to={`/store/${storeID.id}/zone`}
                    style={{ textDecoration: "none" }}
                  >
                    Khu vực
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <AppstoreOutlined />,
                label: (
                  <Link
                    to={`/store/${storeID.id}/product`}
                    style={{ textDecoration: "none" }}
                  >
                    Sản phẩm
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <IdcardOutlined />,
                label: (
                  <Link
                    to={`/store/${storeID.id}/update-info`}
                    style={{ textDecoration: "none" }}
                  >
                    Cập nhật cửa hàng
                  </Link>
                ),
              },
              {
                key: "4",
                icon: <FileTextOutlined />,
                label: (
                  <Link
                    to={`/store/${storeID.id}/productattribute`}
                    style={{ textDecoration: "none" }}
                  >
                    Thuộc tính sản phẩm
                  </Link>
                ),
              },
              {
                key: "5",
                icon: <FileTextOutlined />,
                label: (
                  <Link
                    to={`/store/${storeID.id}/category`}
                    style={{ textDecoration: "none" }}
                  >
                    Loại
                  </Link>
                ),
              },
              {
                key: "6",
                icon: <FileTextOutlined />,
                label: (
                  <Link
                    to={`/store/${storeID.id}/package`}
                    style={{ textDecoration: "none" }}
                  >
                    Quy cách đóng gói
                  </Link>
                ),
              },
              {
                key: "7",
                icon: <RollbackOutlined />,
                label: (
                  <Link
                    to={`/store-owner/store`}
                    style={{ textDecoration: "none" }}
                  >
                    Cửa hàng của bạn
                  </Link>
                ),
              }
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: "0 16px",
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <WebSocketProvider><NavbarAccount /></WebSocketProvider>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <CustomFooter />
    </div>
  );
};
export default StoreLayout;
