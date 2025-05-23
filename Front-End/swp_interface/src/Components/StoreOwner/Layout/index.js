import React, { useState } from "react";
import {
  AppstoreOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PieChartOutlined,
  TableOutlined,
  ArrowLeftOutlined,
  BarChartOutlined,
  CreditCardOutlined,
  SolutionOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import "./style.scss";
import CustomFooter from "../../Footer";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavbarAccount from "../../../Pages/Account/NavbarAccount";
import logo from "../../../assets/img/logo-no-background.png";
import { WebSocketProvider } from "../../../Utils/Websocket/WebsocketContextProvider";
const { Header, Sider, Content } = Layout;

const StoreOwnerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = location.pathname.startsWith("/store-owner/store")
    ? "1"
    : location.pathname.startsWith("/store-owner/invoice")
    ? "2"
    : location.pathname.startsWith("/store-owner/product")
    ? "3"
    : location.pathname.startsWith("/store-owner/employee")
    ? "4"
    : location.pathname.startsWith("/store-owner/statistic/data")
    ? "5.1"
    : location.pathname.startsWith("/store-owner/statistic/chart")
    ? "5.2"
    : location.pathname.startsWith("/store-owner/transaction-history")
    ? "6"
    : location.pathname.startsWith("/store-owner/customer-debt")
    ? "7"
    : location.pathname.startsWith("/store-owner/debt")
    ? "8"
    : "";

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="layout"
    >
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
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedKey]}
            items={[
              {
                key: "1",
                icon: <ShopOutlined />,
                label: (
                  <Link
                    to="/store-owner/store"
                    style={{ textDecoration: "none" }}
                  >
                    Cửa hàng
                  </Link>
                ),
              },
              {
                key: "2",
                icon: <FileTextOutlined />,
                label: (
                  <Link
                    to="/store-owner/invoice"
                    style={{ textDecoration: "none" }}
                  >
                    Hóa đơn
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <AppstoreOutlined />,
                label: (
                  <Link
                    to="/store-owner/product"
                    style={{ textDecoration: "none" }}
                  >
                    Sản phẩm
                  </Link>
                ),
              },
              {
                key: "4",
                icon: <TeamOutlined />,
                label: (
                  <Link
                    to="/store-owner/employee"
                    style={{ textDecoration: "none" }}
                  >
                    Nhân viên
                  </Link>
                ),
              },
              {
                icon: <PieChartOutlined />,
                label: "Thống kê",
                children: [
                  {
                    key: "5.1",
                    icon: <TableOutlined />,
                    label: (
                      <Link
                        to="/store-owner/statistic/data"
                        style={{ textDecoration: "none" }}
                      >
                        Dữ liệu
                      </Link>
                    ),
                  },
                  {
                    key: "5.2",
                    icon: <BarChartOutlined />,
                    label: (
                      <Link
                        to="/store-owner/statistic/chart"
                        style={{ textDecoration: "none" }}
                      >
                        Biểu đồ
                      </Link>
                    ),
                  },
                ],
              },
              {
                key: "6",
                icon: <CreditCardOutlined />,
                label: (
                  <Link
                    to="/store-owner/transaction-history"
                    style={{ textDecoration: "none" }}
                  >
                    Lịch sử thanh toán
                  </Link>
                ),
              },
              {
                key: "7",
                icon: <SolutionOutlined />,
                label: (
                  <Link
                    to="/store-owner/customer-debt"
                    style={{ textDecoration: "none" }}
                  >
                    Quản lý khách hàng
                  </Link>
                ),
              },
              {
                key: "8",
                icon: <DollarOutlined />,
                label: (
                  <Link
                    to="/store-owner/debt"
                    style={{ textDecoration: "none" }}
                  >
                    Danh sách phiếu nợ
                  </Link>
                ),
              },
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
export default StoreOwnerLayout;
