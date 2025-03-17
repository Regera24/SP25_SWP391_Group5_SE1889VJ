import React, { useEffect, useState } from 'react';
import { Table, message, Input, Form, Select, DatePicker, Space, Button, InputNumber, Row, Col } from 'antd';
import qs from 'qs';
import { getToken } from '../../../Utils/UserInfoUtils';
import { getDataWithToken } from '../../../Utils/FetchUtils';
import API from '../../../Utils/API/API';
import './style.scss';

const { RangePicker } = DatePicker;

const descriptionOptions = [
    { value: 'export', label: 'Xuất Khẩu' },
    { value: 'import', label: 'Nhập Khẩu' }
];

const typeOptions = [
    { value: "paid", label: 'Thanh toán' },
    { value: "unpaid", label: 'Nợ' },
];

const Statistic = () => {
    const [form] = Form.useForm();
    const token = getToken();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        storeName: "",
        totalMoneyMin: null,
        totalMoneyMax: null,
        description: null,
        type: "all",
        createdAtRange: null,
        createdBy: ""
    });
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
        sortField: null,
        sortOrder: null,
    });
    const [searchTimeout, setSearchTimeout] = useState(null); 

    const columns = [
        {
            title: 'ID',
            key: 'id',
            render: (_, __, index) => {
                const id =
                    (tableParams.pagination.current - 1) * tableParams.pagination.pageSize +
                    index + 1;
                return id;
            },
            width: '4%',
        },
        {
            title: 'Statistic ID',
            dataIndex: 'statisticsID',
            key: 'statisticsID',
            width: '10%',
        },
        {
            title: 'Store Name',
            dataIndex: 'storeName',
            key: 'storeName',
            width: '15%',
        },
        {
            title: 'Total Money',
            dataIndex: 'totalMoney',
            key: 'totalMoney',
            render: (totalMoney) => `${totalMoney.toFixed(3)} đ`,
            sorter: true,
            width: '15%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (description) => (
                <span style={{ color: description === 'Export' ? 'green' : 'red' }}>
                    {description === 'Export' ? 'Xuất Khẩu' : 'Nhập Khẩu'}
                </span>
            ),
            width: '10%',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <span style={{ color: type ? 'green' : 'red' }}>
                    {type ? 'Thanh toán' : 'Nợ'}
                </span>
            ),
            width: '9%',
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: '12%',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '20%',
            render: (createdAt) => {
                const date = new Date(createdAt);
                return date.toLocaleString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
            }
        }
    ];

    const getStatisticParams = (params) => {
        const { pagination, sortField, sortOrder } = params;
        return qs.stringify({
            page: pagination.current - 1,
            size: pagination.pageSize,
            sortBy: sortField || "createdAt",
            descending: sortOrder === "descend",
        });
    };

    const fetchStatistics = async () => {
        setLoading(true);
        try {
            const queryParams = `?storeName=${encodeURIComponent(filters.storeName)}&` +
                `totalMoneyMin=${filters.totalMoneyMin || ''}&` +
                `totalMoneyMax=${filters.totalMoneyMax || ''}&` +
                `description=${filters.description || ''}&` +
                `type=${filters.type || ''}&` +
                `createdAtStart=${filters.createdAtRange?.[0]?.format('YYYY-MM-DD') || ''}&` +
                `createdAtEnd=${filters.createdAtRange?.[1]?.format('YYYY-MM-DD') || ''}&` +
                `createdBy=${encodeURIComponent(filters.createdBy)}&` +
                getStatisticParams(tableParams);

            const response = await getDataWithToken(API.STORE_OWNER.GET_STORE_STATISTICs + queryParams, token);
            setData(response.content || []);
            setTableParams(prev => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    total: response.totalElements,
                },
            }));
        } catch (error) {
            message.error('Không thể tải dữ liệu thống kê');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, [
        tableParams.pagination.current,
        tableParams.pagination.pageSize,
        tableParams.sortField,
        tableParams.sortOrder,
        filters // Include filters in the dependency array
    ]);

    const handleTableChange = (pagination, _, sorter) => {
        setTableParams({
            pagination,
            sortField: sorter?.field || null,
            sortOrder: sorter?.order || null,
        });
    };


    const handleInputChange = (changedValues, allValues) => {
        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Set new timeout
        setSearchTimeout(
            setTimeout(() => {
                handleSearch();
            }, 1000)
        );

        // Immediately update form values
        form.setFieldsValue(allValues);
    };


    const handleSearch = () => {
        const values = form.getFieldsValue();
        setFilters({
            storeName: values.storeName || "",
            totalMoneyMin: values.totalMoneyMin || null,
            totalMoneyMax: values.totalMoneyMax || null,
            description: values.description || null,
            type: values.type || "all",
            createdAtRange: values.createdAtRange || null,
            createdBy: values.createdBy || ""
        });
        setTableParams(prev => ({
            ...prev,
            pagination: { ...prev.pagination, current: 1 }
        }));
    };
    const handleReset = () => {
        form.resetFields();
        setFilters({
            storeName: "",
            totalMoneyMin: null,
            totalMoneyMax: null,
            description: null,
            type: "all",
            createdAtRange: null,
            createdBy: ""
        });
        setTableParams(prev => ({
            ...prev,
            pagination: { ...prev.pagination, current: 1 }
        }));
    };

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                className="filter-form"
                onValuesChange={handleInputChange} // Use onValuesChange
            >
                <Row gutter={16}>
                    <Col span={4}>
                        <Form.Item label="Store Name" name="storeName">
                            <Input placeholder="Enter store name" />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label="Min Money" name="totalMoneyMin">
                            <InputNumber
                                placeholder="Min"
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                step={1000}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label="Max Money" name="totalMoneyMax">
                            <InputNumber
                                placeholder="Max"
                                style={{ width: '100%' }}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                step={1000}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label="Description" name="description">
                            <Select
                                allowClear
                                options={descriptionOptions}
                                placeholder="Select type"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item label="Type" name="type">
                            <Select
                                allowClear
                                options={typeOptions}
                                placeholder="Select type"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Created By" name="createdBy">
                            <Input placeholder="Enter creator" />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Created At Range" name="createdAtRange">
                            <RangePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right', marginTop: '8px' }}>
                        <Button onClick={handleReset}>
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Table
                columns={columns}
                rowKey="statisticsID"
                dataSource={data}
                pagination={{
                    ...tableParams.pagination,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                }}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default Statistic;