import React, { useEffect, useState } from 'react';
import { Table, message, Input } from 'antd';
import qs from 'qs';
import API from '../../../Utils/API/API';
import { getToken } from '../../../Utils/UserInfoUtils';
import { getDataWithToken } from '../../../Utils/FetchUtils';
import { title } from 'framer-motion/client';
import { useParams } from 'react-router-dom';

const { Search } = Input;

const Zone = () => {
    const token = getToken();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
        filters: {},
        sort: {},
    });

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'ID', width: '15%', sorter: true},
        { title: 'Product ID', dataIndex: 'productID', key: 'productID', width: '15%', sorter: true},
        { title: 'Zone Name', dataIndex: 'name', key: 'name', width: '30%' },
        { title: 'Product Name', dataIndex: 'productName', key: 'productName', width: '20%'},
        { title: 'CreatedBy', dataIndex: 'created_by', key: 'createdBy', width: '20%' },
        { title: 'CreatedAt', dataIndex: 'created_at', key: 'createdAt', width: '20%'},
        { title: 'UpdatedAt', dataIndex: 'updated_at', key:'updatedAt', width: '20%'},
        { title: 'Location', dataIndex: 'location', key: 'location', width: '20%' },
    ];

    const storeID = useParams();

    const getZoneParams = (params) => {
        const { pagination } = params;
        return `storeID=1&page=${pagination.current - 1}&size=${pagination.pageSize}`;
    };

    const fetchZones = async () => {
        setLoading(true);
        try {
            const queryParams = '?' + getZoneParams(tableParams);
    
            const response = await getDataWithToken(API.STORE_OWNER.GET_STORE_ZONES + queryParams , token);
            if (!response || !response.content) {
                throw new Error("Dữ liệu trả về không hợp lệ");
            }
            setData(response.content);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: response.totalElements,
                },
            });
        } catch (error) {
            console.error("Lỗi khi fetch dữ liệu:", error);
            message.error('Không thể tải dữ liệu danh sách zones');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchZones();
    }, [tableParams.pagination.current, tableParams.pagination.pageSize, searchValue]);

    const handleTableChange = (pagination) => {
        setTableParams({ pagination });
    };

    return (
        <div>
            <Table
                columns={columns}
                rowKey="id"
                dataSource={data}
                pagination={{ ...tableParams.pagination, showSizeChanger: true }}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default Zone;
