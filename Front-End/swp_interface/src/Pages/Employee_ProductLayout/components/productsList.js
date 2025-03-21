import React, { useState, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    ShopOutlined,
    VideoCameraOutlined,
    InsertRowBelowOutlined,
    TeamOutlined,
    SolutionOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import logo from '../../../../src/assets/img/logoviet.png';
import { useNavigate } from 'react-router-dom';
import { Button, Layout, Menu, theme, Input, Space } from 'antd';
import CustomFooter from "../../../../src/Components/Footer";
import { Table, Spin } from 'antd';
import API from '../../../Utils/API/API';
import { getToken } from '../../../Utils/UserInfoUtils';
import moment from 'moment';
import '../ProductIndex.css'
const { Header, Sider, Content } = Layout;


const Employee_Products = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [sortInfo, setSortInfo] = useState({ field: 'price', order: false });
    const token = getToken();
    const [minQuantity, setMinQuantity] = useState(0);
    const [maxQuantity, setMaxQuantity] = useState();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (text, record, index) => index + 1,
            width: 5,
        },
        {
            title: 'Ảnh Sản Phẩm',
            dataIndex: 'productImage',
            key: 'productImage',
            width: 10,
            render: (productImage) => (
                <img style={{ width: '100%' }} src={productImage} alt="" />
            ),
        },
        {
            title: 'Gạo',
            dataIndex: 'name',
            key: 'name',
            width: 15,
        },
        {
            title: 'Số Lượng ',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 5,
        },
        {
            title: 'Mô Tả',
            dataIndex: 'information',
            key: 'information',
            width: '30%',
        },
        {
            title: 'Giá Gạo',
            dataIndex: 'price',
            sorter: true,
            key: 'price',
            width: 10,
            render: (price) => `${price} đ`,
        },
        {
            title: 'Loại Gạo',
            key: 'categoryname',
            width: 20,
            render: (text, record) => (
                <span>{record.employeeCategoryDTO?.name || 'N/A'}</span>
            ),
            filters: [
                { text: 'Gạo Jasmine', value: 'Gạo Jasmine' },
                { text: 'Gạo Hấp', value: 'Gạo Hấp' },
                { text: 'Gạo Lứt', value: 'Gạo Lứt' },
                { text: 'Gạo Basmati', value: 'Gạo Basmati' },
                { text: 'Nếp', value: 'Nếp' },
            ],
            onFilter: (value, record) => record.employeeCategoryDTO?.name === value,
        },
        {

            title: 'Chỉnh Sửa Lúc',
            dataIndex: 'N/A',
            key: 'N/A',
            render: (text) => text ? moment(Number(text)).format('DD/MM/YYYY HH:mm:ss') : 'N/A',
            width: 15,
        }
    ];
    const handleSearch = async (page, size) => {
        try {
            const response = await axios.get(API.EMPLOYEE.GET_PRODUCTS_BY_NAME, {
                params: {
                    name: isSearch ? searchTerm : '',
                    page: page - 1,
                    size: size,
                    sortBy: sortInfo.field,
                    descending: sortInfo.order,
                    minQuantity: minQuantity || undefined,
                    maxQuantity: maxQuantity || undefined,
                },
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm dấu backtick để sử dụng template string
                },
            });
            console.log("Search response:", response.data);
            setProducts(response.data.content);
            setTotalItems(response.data.totalElements);
        } catch (error) {
            console.error('Lỗi khi gọi API tìm kiếm:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleTableChange = (pagination, filters, sorter) => {
        const { current, pageSize } = pagination;
        setSortInfo({
            field: sorter?.field || 'price',
            order: sorter?.order === 'descend',
        });
        setCurrentPage(current);
        setPageSize(pageSize);
        handleSearch(current, pageSize, sorter);
    };
    useEffect(() => {
        handleSearch(currentPage, pageSize);
    }, [currentPage, pageSize, sortInfo]);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    style={{
                        backgroundColor: 'white',
                        color: '#fff',
                    }}
                    trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <div style={{ height: '80px' }}>
                        <img style={{ width: '90px', marginRight: '100px' }} src={logo} alt="logo" class="header__navbar__img" />
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item
                            key="1"
                            icon={<InsertRowBelowOutlined />}
                            onClick={() => handleNavigation('/employee/products')}
                        >
                            Sản Phẩm Gạo
                        </Menu.Item>
                        <Menu.Item
                            key="2"
                            icon={<ShopOutlined />}
                            onClick={() => handleNavigation('/employee/ricezone')}
                        >
                            Khu Vực Gạo
                        </Menu.Item>
                        <Menu.Item
                            key="3"
                            icon={<TeamOutlined />}
                            onClick={() => handleNavigation('/employee/customers')}
                        >
                            Khách Hàng
                        </Menu.Item>
                        <Menu.Item
                            key="4"
                            icon={<SolutionOutlined />}
                            onClick={() => handleNavigation('/employee/invoices')}
                        >
                            Hóa Đơn
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: '0 16px',
                            background: colorBgContainer,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >

                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "0 15px" }}>
                            <h3 style={{ textAlign: "center", margin: 0, color: "#E3C584" }}>
                                <i>Danh mục sản phẩm của cửa hàng</i>
                            </h3>
                            <Space.Compact
                                style={{
                                    width: '20%',
                                }}
                            >
                                <Input
                                    placeholder='Tìm Tên Loại Gạo.....'
                                    value={searchTerm}
                                    onChange={(e) => { setIsSearch(false); setSearchTerm(e.target.value) }}
                                />
                                <Button type="primary" onClick={() => { setIsSearch(true); handleSearch(1, pageSize) }}>Tìm Kiếm </Button>
                            </Space.Compact>
                        </div>
                        <div className="filter-container">
                            <Space size="middle">
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px", color: "#6B7012" }}>
                                    <span>Số Lượng Tối Thiểu :</span>
                                    <Input
                                        type="number"
                                        value={minQuantity}
                                        onChange={(e) => setMinQuantity(e.target.value)}
                                        placeholder="Nhập min"
                                        style={{ width: 150 }}
                                        allowClear
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px", color: "#6B7012" }}>
                                    <span>Số Lượng Tối Đa :</span>
                                    <Input
                                        type="number"
                                        value={maxQuantity}
                                        onChange={(e) => setMaxQuantity(e.target.value)}
                                        placeholder="Nhập max"
                                        style={{ width: 150 }}
                                        allowClear
                                    />
                                </div>
                                <Button type="primary" onClick={() => { setIsSearch(true); handleSearch(1, pageSize); }}>
                                    Lọc Sản Phẩm
                                </Button>
                            </Space>
                        </div>
                        {loading ? (<Spin size="large" />) : (
                            <Table style={{ marginTop: 45 }}
                                dataSource={products}
                                columns={columns}
                                rowClassName={(record) =>
                                    record.quantity === 0 ? "row-red" : ""
                                }

                                pagination={{
                                    current: currentPage,
                                    pageSize: pageSize,
                                    total: totalItems,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['1', '5', '10', '20'],
                                }}
                                onChange={handleTableChange}
                                className="custom-table"
                            />
                        )}


                    </Content>

                </Layout>
            </Layout>
            <CustomFooter />
        </div>
    );
};
export default Employee_Products;