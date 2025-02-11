import React, { useEffect, useState } from 'react';
import { Table, message, Input } from 'antd';
import qs from 'qs';

const { Search } = Input;

const Product = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [timeoutId, setTimeoutId] = useState(null);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'productID',
            key: 'productID',
            width: '10%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true, // Bật tính năng sắp xếp
            width: '20%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: true, // Bật tính năng sắp xếp
            render: (price) => `$${price.toFixed(2)}`, // Định dạng giá tiền
            width: '15%',
        },
        {
            title: 'Information',
            dataIndex: 'information',
            key: 'information',
            ellipsis: true, // Hiển thị chuỗi ngắn gọn với dấu "..."
            width: '30%',
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: true, // Bật tính năng sắp xếp
            width: '20%',
        },
    ];

    const getProductParam = (params) => {
        const { pagination, sortField, sortOrder } = params;
        return qs.stringify({
            page: pagination.current - 1,
            size: pagination.pageSize,
            sortBy: sortField,
            descending: sortOrder === 'descend',
        });
    };

    const fetchInvoice = async () => {
        setLoading(true);
        try {
            const url = searchValue
                ? `http://localhost:9999/store-owner/search-products?productName=${encodeURIComponent(searchValue)}&${getProductParam(tableParams)}`
                : `http://localhost:9999/store-owner/products?${getProductParam(tableParams)}`;
    
            const response = await fetch(url);
            const result = await response.json();
    
            console.log(result);
    
            setData(result.content || []);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: result.totalElements,
                },
            });
        } catch (error) {
            message.error('Không thể tải dữ liệu danh sách products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoice();
    }, [
        tableParams.pagination.current,
        tableParams.pagination.pageSize,
        tableParams.sortField,
        tableParams.sortOrder,
        searchValue,
    ]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortField: sorter.field,
            sortOrder: sorter.order,
        });
    };

    const handleSearch = (e) => {
        const value = e.target.value;

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            setSearchValue(value);
            setTableParams({
                ...tableParams,
                pagination: { current: 1, pageSize: tableParams.pagination.pageSize },
            });
        }, 1000);

        setTimeoutId(newTimeoutId);
    };

    return (
        <div>
            <Search
                placeholder="Enter Product Name"
                onChange={handleSearch}
                enterButton
                style={{ marginBottom: 16 }}
            />
            <Table
                columns={columns}
                rowKey="productID"
                dataSource={data}
                pagination={{
                    ...tableParams.pagination,
                    showSizeChanger: true,
                    pageSizeOptions: ['1', '2', '3', '4', '5'],
                }}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default Product;
