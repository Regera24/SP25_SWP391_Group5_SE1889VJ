import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Flex, Modal } from 'antd';
import { InfoOutlined, EditOutlined } from '@ant-design/icons';
import API from '../../../Utils/API/API';
import { getToken } from '../../../Utils/UserInfoUtils';
import { getDataWithToken } from '../../../Utils/FetchUtils';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import moment from 'moment';
import CreateCategory from './CreateCategory';
import UpdateCategory from './UpdateCategory';

const { Search } = Input;

const Category = () => {
    const token = getToken();
    const navigate = useNavigate();
    const storeID = useParams();

    // Khai báo các state
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
        sortBy: "createdAt",
        descending: false
    });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    // Định nghĩa các cột cho bảng
    const columns = [
        { title: 'Tên Danh Mục', dataIndex: 'name', key: 'name', width: '20%' },
        { title: 'Mô Tả', dataIndex: 'description', key: 'description', width: '30%' },
        {
            title: 'Tạo Lúc',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '15%',
            render: (text) => (text ? moment(text).format('HH:mm DD/MM/YYYY') : 'Chưa có thông tin'),
            sorter: true,
        },
        {
            title: 'Cập Nhật Lúc',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: '15%',
            render: (text) => (text ? moment(text).format('HH:mm DD/MM/YYYY') : 'Chưa có thông tin'),
            sorter: true,
        },
        {
            title: 'Hành động',
            key: 'action',
            width: '20%',
            render: (record) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            setSelectedCategory(record);
                            setIsInfoModalOpen(true);
                        }}
                        title="Thông tin chi tiết"
                    >
                        <InfoOutlined />
                    </Button>
                    <Button
                        type=""
                        onClick={() => {
                            setSelectedCategory(record);
                            setIsUpdateModalOpen(true);
                        }}
                    >
                        <EditOutlined />
                    </Button>
                </div>
            ),
        },
    ];

    // Hàm tạo tham số truy vấn API
    const getCategoryParams = (params, searchValue) => {
        const { pagination, sortBy, descending } = params;
        let query = `storeID=${storeID.id}&page=${pagination.current - 1}&size=${pagination.pageSize}`;
        if (sortBy) query += `&sortBy=${sortBy}&descending=${descending}`;
        if (searchValue) query += `&search=${encodeURIComponent(searchValue)}`;
        return query;
    };

    // Hàm lấy dữ liệu danh mục từ API
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const queryParams = '?' + getCategoryParams(tableParams, searchValue);
            const response = await getDataWithToken(API.STORE_DETAIL.GET_CATEGORIES + queryParams, token);
            if (!response || !response.content) throw new Error('Dữ liệu trả về không hợp lệ');
            setData(response.content);
            setTableParams((prev) => ({
                ...prev,
                pagination: { ...prev.pagination, total: response.totalElements },
            }));
        } catch (error) {
            navigate('/unauthorized');
        } finally {
            setLoading(false);
        }
    };

    // Gọi fetchCategories khi các tham số thay đổi
    useEffect(() => {
        fetchCategories();
    }, [tableParams.pagination.current, tableParams.pagination.pageSize, tableParams.sortBy, tableParams.descending, searchValue]);

    // Xử lý thay đổi bảng (phân trang, sắp xếp)
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams((prev) => ({
            ...prev,
            pagination,
            sortBy: sorter.field || 'createdAt',
            descending: sorter.order === 'descend',
        }));
    };

    // Giao diện component
    return (
        <div>
            <Button className="btn-create" title="Thêm danh mục mới" onClick={() => setIsCreateModalOpen(true)}>
                Thêm mới
            </Button>
            <Search
                placeholder="Nhập tên danh mục và mô tả..."
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    setTableParams((prev) => ({
                        ...prev,
                        pagination: { ...prev.pagination, current: 1 },
                    }));
                }}
                enterButton
            />
            <Table
                columns={columns}
                rowKey="id"
                dataSource={data}
                pagination={{ ...tableParams.pagination, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
                loading={loading}
                onChange={handleTableChange}
            />
            <Flex vertical gap="middle" align="flex-start">
                {/* Modal thông tin chi tiết */}
                <Modal open={isInfoModalOpen} onCancel={() => setIsInfoModalOpen(false)} footer={null}>
                    {selectedCategory && (
                        <div className="category-modal">
                            <div className="product-header">
                                <div className="product-icon">C</div>
                                <span className="product-label">Mã: {selectedCategory.id}</span>
                            </div>
                            <div className="category-content">
                                <table>
                                    <tr>
                                        <td><strong>Tên Danh Mục:</strong></td>
                                        <td>{selectedCategory.name}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Mô Tả:</strong></td>
                                        <td>{selectedCategory.description}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Tạo Bởi:</strong></td>
                                        <td>{selectedCategory.createdBy || 'Chưa có thông tin'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Tạo Lúc:</strong></td>
                                        <td>{selectedCategory.createdAt ? moment(selectedCategory.createdAt).format('HH:mm DD/MM/YYYY') : 'Chưa có thông tin'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cập Nhật Bởi:</strong></td>
                                        <td>{selectedCategory.updatedBy || 'Chưa có thông tin'}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cập Nhật Lúc:</strong></td>
                                        <td>{selectedCategory.updatedAt ? moment(selectedCategory.updatedAt).format('HH:mm DD/MM/YYYY') : 'Chưa có thông tin'}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    )}
                </Modal>
                {/* Modal tạo mới */}
                <Modal title="Thêm Danh Mục Mới" open={isCreateModalOpen} onCancel={() => setIsCreateModalOpen(false)} footer={null}>
                    <CreateCategory onClose={() => setIsCreateModalOpen(false)} storeID={storeID.id} fetchCategories={fetchCategories} />
                </Modal>
                {/* Modal cập nhật */}
                <Modal title="Cập Nhật Danh Mục" open={isUpdateModalOpen} onCancel={() => setIsUpdateModalOpen(false)} footer={null}>
                    {selectedCategory && (
                        <UpdateCategory
                            category={selectedCategory}
                            storeID={storeID.id}
                            onClose={() => setIsUpdateModalOpen(false)}
                            fetchCategories={fetchCategories}
                        />
                    )}
                </Modal>
            </Flex>
        </div>
    );
};

export default Category;