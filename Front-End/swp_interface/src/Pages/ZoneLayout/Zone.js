import React, { useState, useEffect } from 'react';
import logo from '../../assets/img/logoviet.png'
import DropDown from '../ProductsEdit/ProductsEdit';
import { Table, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Pagination } from "antd";
import moment from 'moment';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    ShopOutlined,
    VideoCameraOutlined,
    InsertRowBelowOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { Spin, List as ListItem } from 'antd';
import { Button, Layout, Menu, theme, SearchOutlined, Select, Space, Modal } from 'antd';
import CustomFooter from "../../Components/Footer";
import Search from 'antd/es/transfer/search';
const { Header, Sider, Content } = Layout;




const ZoneList = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const [zone, setZone] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [selectedZoneName, setSelectedZoneName] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const [searchParams, setSearchParams] = useState("");

    const [filters, setFilters] = useState({
        quantityMin: null,
        quantityMax: null,
        sizeMin: null,
        sizeMax: null,
    });

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();



    useEffect(() => {
        if (searchParams) {
            const debounceTimeout = setTimeout(() => {
                fetchSearchZones(currentPage, pageSize, searchParams);
            }, 1000);
            return () => clearTimeout(debounceTimeout);
        } else {
            fetchZone(currentPage, pageSize, filters);
        }
    }, [currentPage, pageSize, searchParams]);

    const Zonecolumns = [
        {
            title: 'STT',
            key: 'stt',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Zone ID',
            dataIndex: 'zoneID',
            key: 'zoneID',
        },
        {
            title: 'Zone Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
        },
        {
            title: 'Created By',
            dataIndex: 'created_by',
            key: 'created_by',
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Button type="primary" onClick={() =>
                    showModal(record)}  >
                    Store
                </Button>
            ),
        }

    ]; const ZoneIN4columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Store ID',
            dataIndex: 'storeID',
            key: 'zoneID',
        },

        {
            title: 'Store Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Store Name',
            dataIndex: 'storeName',
            key: 'name',
        },

        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'hotline',
            dataIndex: 'hotline',
            key: 'hotline',
        },
        {
            title: 'Operating Hour',
            dataIndex: 'operatingHour',
            key: 'operatingHour',
        },
        {
            title: 'Status',
            dataIndex: 'operatingHour',
            key: 'operatingHour',
            render: (text, record) => {
                const currentTime = moment();
                const [start, end] = text.split('-');
                const startTime = moment(start, 'h A');
                const endTime = moment(end, 'h A');
                const isOpen = currentTime.isBetween(startTime, endTime);


                return (
                    <span style={{ color: isOpen ? 'green' : 'red', fontWeight: 'bold' }}>
                        {isOpen ? 'The store is OPEN' : 'The store is CLOSED'}
                    </span>
                );
            },
        },




    ];


    const handleFilterChange = (type, value) => {
        setFilters({ ...filters, [type]: value });
    };
    const handleFilterSubmit = () => {
        fetchZone(currentPage, pageSize, filters);
    };


    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleTableChange = (pagination) => {
        const { current, pageSize } = pagination;

        setCurrentPage(current);
        setPageSize(pageSize);
        fetchZone(current, pageSize, filters);
    };
    const fetchZone = async (page, size, filters) => {
        try {
            const response = await axios.get('http://localhost:9999/home/owner/ricezone', {

                params: {
                    page: page - 1,
                    size: size,
                    quantityMin: filters ? filters.quantityMin : null,
                    quantityMax: filters ? filters.quantityMax : null,
                    sizeMin: filters ? filters.sizeMin : null,
                    sizeMax: filters ? filters.sizeMax : null,
                },
            });
            console.log("Dữ liệu liên quan22:", response.data);
            console.log(response.data.content)
            setZone(response.data.content);

            setTotalItems(response.data.totalElements);
            setLoading(false); //false la trang thai  loading data xong

        } catch (error) {
            console.error('nổ rồi các cháu ơi, lỗi lỗi lỗi', error)
            setLoading(false);
        }

    }



    const fetchSearchZones = async (page, size, searchParams) => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:9999/home/owner/ricezone/searchzone", {
                params: {
                    page: page - 1,
                    size: size,
                    search: searchParams
                },
            });

            setZone(response.data.content);
            setTotalItems(response.data.totalElements);
            setLoading(false);
        } catch (error) {
            console.error("nổ lỗi rồi các cháu ơi:", error);
            setLoading(false);
        }
    };

    const showModal = (zone) => {
        setModalData(zone.storeDTO ? [zone.storeDTO] : []);
        setSelectedZoneName(zone.name);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };




    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Layout style={{minHeight:'100vh'}}> 
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
                        defaultSelectedKeys={['2']}
                    >
                        <Menu.Item
                            key="1"
                            icon={<InsertRowBelowOutlined />}
                            onClick={() => handleNavigation('/home/owner/products')}
                        >
                            Grain Selection
                        </Menu.Item>
                        <Menu.Item
                            key="2"
                            icon={<ShopOutlined />}
                            onClick={() => handleNavigation('/home/owner/ricezone')}
                        >
                            Rice Zone
                        </Menu.Item>
                        <Menu.Item
                            key="3"
                            icon={<UploadOutlined />}
                            onClick={() => console.log("Customer clicked!")}
                        >
                            Customer
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

                        <Space.Compact
                            style={{
                                width: '100%',
                            }}
                        >
                            <Input
                                placeholder='Tìm Khu Vực Gạo.....'
                                value={searchParams}
                                onChange={(e) => setSearchParams(e.target.value)}
                            />
                            <Button type="primary"
                                onClick={() => {
                                    fetchSearchZones(currentPage, pageSize, searchParams);
                                }}>Search</Button>
                        </Space.Compact>
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
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 15px" }}>
                            <h3><i style={{ marginLeft: 15 }}>Zone Product Preview </i></h3>
                            <Space size="middle">
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                                    <span>Quantity Min:</span>
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        min={0}
                                        style={{ width: 120 }}
                                        allowClear onChange={(e) => handleFilterChange('quantityMin', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                                    <span>Quantity Max:</span>
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        min={0}
                                        style={{ width: 120 }}
                                        allowClear onChange={(e) => handleFilterChange('quantityMax', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                                    <span>Size Min:</span>
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        min={0}
                                        style={{ width: 120 }}
                                        allowClear onChange={(e) => handleFilterChange('sizeMin', e.target.value)}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                                    <span>Size Max:</span>
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        min={0}
                                        style={{ width: 120 }}
                                        allowClear onChange={(e) => handleFilterChange('sizeMax', e.target.value)}
                                    />
                                </div>
                                <Button type="primary" onClick={handleFilterSubmit}>
                                    Filter
                                </Button>
                            </Space>



                            {/* <span style={{ marginLeft: 840 }}> <DropDown /></span> */}
                        </div>

                        {loading ? (<Spin size="large" />) : (
                            <Table style={{ marginTop: 45 }}
                                dataSource={zone}
                                columns={Zonecolumns}
                                rowClassName={(record) =>
                                    record.quantity === 0 ? "row-red" : ""
                                }

                                pagination={{
                                    current: currentPage,
                                    pageSize: pageSize,
                                    total: totalItems,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['1', '5', '10'],
                                }}
                                onChange={handleTableChange}
                            />
                        )}
                    </Content>
                </Layout>
            </Layout>

            <Modal
                title={<span style={{ fontWeight: 500, fontSize: '18px' }}>Store For : {selectedZoneName}</span>}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
                style={{ top: 300, left: 40 }}
                width="75%"
                bodyStyle={{ height: '10vh' }}
            >
                <Table
                    dataSource={modalData}
                    columns={ZoneIN4columns}
                    rowKey={(record) => record.storeID}
                    pagination={false}
                />
            </Modal>


            <CustomFooter />
        </div>
    );
};
export default ZoneList;