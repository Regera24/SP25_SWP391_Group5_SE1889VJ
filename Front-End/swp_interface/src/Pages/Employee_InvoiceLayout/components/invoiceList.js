import { Button, Input, Space, Spin, Table, Tag, Modal, Descriptions } from 'antd';
import axios from 'axios';
import debounce from "lodash.debounce";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../Utils/API/API';
import { getToken } from '../../../Utils/UserInfoUtils';
import '../styleInvoices.css';
const InvoiceList = () => {
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sorterState, setSorterState] = useState({ field: null, order: null });
    const [filters, setFilters] = useState({
        phonesearch: null,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [selectedInvoice2, setSelectedInvoice2] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const navigate = useNavigate();
    const token = getToken();

    const InvoiceColumns = [
        {
            title: 'STT',
            key: 'stt',
            render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,

        },
        {
            title: 'Customer Details',
            key: 'customerDetails',
            render: (_, record) => (
                <>
                    <div><strong>Name:</strong> {record.customerName}</div>
                    <div><strong>Phone:</strong> {record.customerPhone}</div>
                </>
            ),
            width: '15%',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={type ? 'green' : 'red'}>
                    {type ? 'Nhập gạo' : 'Xuất gạo'}
                </Tag>
            ),
            filters: [
                { text: 'Nhập gạo', value: true },
                { text: 'Xuất gạo', value: false },
            ],
            onFilter: (value, record) => record.type === value,
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'totalAmount',
            render: (totalAmount) => `${(totalAmount || 0).toLocaleString()} đ`,
            key: 'totalAmount',
            sorter: true,


        },
        {
            title: 'MoneyShipping',
            dataIndex: 'totalShipping',
            render: (totalShipping) => `${(totalShipping || 0).toLocaleString()} đ`,
            key: 'totalShipping',
            sorter: true,

        },
        {
            title: 'Tạo Ra Lúc',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            render: (text) => text ? moment(Number(text)).format('DD/MM/YYYY HH:mm:ss') : 'N/A'
        },
        {
            title: 'Chỉnh Sửa Lúc',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (text) => text ? moment(Number(text)).format('DD/MM/YYYY HH:mm:ss') : 'N/A'
        },
        {
            title: 'Mô Tả ',
            dataIndex: 'description',
            key: 'description',

        },


    ];
    const detailColumns = [
        {
            title: 'STT',
            key: 'stt',
            render: (text, record, index) => index + 1,
            width: '10%',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            width: '25%',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '15%',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${(price || 0).toLocaleString()} đ`,
            width: '20%',
        },
        {
            title: 'Giảm Giá',
            dataIndex: 'discount',
            key: 'discount',
            render: (_, record) => `${(record.discount).toLocaleString()} đ`,
            width: '20%',
        },
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        const { current, pageSize } = pagination;
        const { field, order } = sorter || {};
        setCurrentPage(current);
        setPageSize(pageSize);
        setSorterState({ field, order });
        fetchZone(current, pageSize, filters, { field, order });
    };
    const handleFilterSubmit = () => {
        fetchZone(currentPage, pageSize, filters, sorterState
            //null, searchTerm
        );
    };


    useEffect(() => {
        fetchZone(currentPage, pageSize, filters, sorterState
            // null, searchTerm
        );
    }, [currentPage, pageSize, filters, sorterState]);

    const fetchZone = async (page, size,
        filters, sorter
        //search
    ) => {
        const { field, order } = sorter || {};
        const sortByMapping = {
            totalAmount: 'productMoney',
            totalShipping: 'shipMoney',
            created_at: 'createdAt',
        };
        const sortBy = field ? sortByMapping[field] || field : 'createdAt';
        try {
            const response = await axios.get(API.EMPLOYEE.GET_eINVOICES, {
                params: {
                    page: page - 1,
                    size: size,
                    phonesearch: filters ? filters.phonesearch : null,
                    sortBy: sortBy,
                    sortOrder: order === 'ascend' ? true : false
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Dữ liệu liên quan22:", response.data);
            const data = Array.isArray(response.data.content) ? response.data.content : [];
            setCustomers(data);
            setTotalItems(response.data.totalElements || 0);
            setLoading(false);
        } catch (error) {
            console.error('nổ rồi các cháu ơi, lỗi lỗi lỗi', error)
            setLoading(false);
        }

    }
    const fetchInvoiceDetails = async (invoiceId) => {
        setModalLoading(true);

        try {
            const response = await axios.get(API.EMPLOYEE.GET_eINVOICES_DETAILS, {
                params: {
                    invoiceId: invoiceId
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Dữ liệu chi tiết hóa đơn:', response.data);
            setSelectedInvoice2(response.data);
            const details = Array.isArray(response.data) ? response.data : [];
            setSelectedInvoice((prev) => ({
                ...prev,
                ...response.data,
                details: details,
            }));
            setIsModalOpen(true);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết hóa đơn:', error);
        } finally {
            setModalLoading(false);
        }
    };
    const handleFilterChange = debounce((type, value) => {
        setFilters({ ...filters, [type]: value });
    }, 1000)
    const handleRowClick = (record) => {
        setSelectedInvoice({
            id: record.id,
            customerName: record.customerName,
            customerPhone: record.customerPhone,
            type: record.type,
            totalAmount: record.totalAmount,
            totalShipping: record.totalShipping,
            created_at: record.created_at,
            details: [],
        });
        setIsModalOpen(true);
        fetchInvoiceDetails(record.id);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedInvoice(null);
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 15px" }}>
                <h3><i style={{ marginLeft: 15, color: "#E3C584" }}>Danh Sách Hóa Đơn Khách Hàng </i></h3>
                <Space size="middle">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "20px" }}>
                        <Input
                            placeholder="Tìm SDT"
                            maxLength={10}
                            style={{ width: 220 }}
                            allowClear onChange={(e) => handleFilterChange('phonesearch', e.target.value)}

                        />
                    </div>
                    <Button type="primary" onClick={handleFilterSubmit} >
                        Tìm Kiếm
                    </Button>

                </Space>

            </div>
            {loading ? (<Spin size="large" />) : (
                <Table style={{ marginTop: 25 }}
                    dataSource={customers}
                    columns={InvoiceColumns}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: totalItems,
                        showSizeChanger: true,
                        pageSizeOptions: ['1', '5', '10'],
                    }}
                    onChange={handleTableChange}
                    className="custom-table"
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                        style: { cursor: 'pointer' },
                    })}
                    rowKey="id"
                />
            )}
            <Modal
                title={`Chi tiết hóa đơn #${selectedInvoice?.id || ''}`}
                visible={isModalOpen}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Đóng
                    </Button>,
                ]}
                width={800}
            >
                {modalLoading ? (
                    <Spin tip="Đang tải chi tiết..." />
                ) : selectedInvoice ? (
                    <>
                        <Descriptions bordered column={2} style={{ marginBottom: 16 }}>
                            <Descriptions.Item label="Tên khách hàng">
                                {selectedInvoice.customerName || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">
                                {selectedInvoice.customerPhone || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                <Tag color={selectedInvoice.type ? 'green' : 'red'}>
                                    {selectedInvoice.type ? 'Nhập gạo' : 'Xuất gạo'}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Thời gian tạo">
                                {selectedInvoice.created_at
                                    ? moment(Number(selectedInvoice.created_at)).format('DD/MM/YYYY HH:mm:ss')
                                    : 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tổng tiền sản phẩm">
                                {(selectedInvoice.totalAmount || 0).toLocaleString()} đ
                            </Descriptions.Item>
                            <Descriptions.Item label="Tiền vận chuyển">
                                {(selectedInvoice.totalShipping || 0).toLocaleString()} đ
                            </Descriptions.Item>
                        </Descriptions>

                        <h4>Danh sách sản phẩm</h4>
                        <Table
                            columns={detailColumns}
                            dataSource={selectedInvoice2 || []}
                            rowKey={(record, index) => index}
                            pagination={false}
                            scroll={{ y: 240 }}
                        />
                        <div style={{ marginTop: 16, textAlign: 'right' }}>
                            <p><strong>Tổng tiền sản phẩm:</strong> {(selectedInvoice.totalAmount || 0).toLocaleString()} đ</p>
                            <p><strong>Tiền vận chuyển:</strong> {(selectedInvoice.totalShipping || 0).toLocaleString()} đ</p>
                            <p><strong>Tổng cộng:</strong> {((selectedInvoice.totalAmount + selectedInvoice.totalShipping) || 0).toLocaleString()} đ</p>
                        </div>
                    </>
                ) : (
                    <p>Không có dữ liệu chi tiết.</p>
                )}
            </Modal>

        </>
    )
}

export default InvoiceList;