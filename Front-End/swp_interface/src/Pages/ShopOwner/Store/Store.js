import React, { useEffect, useState } from 'react';
import { message, Input, Spin, Pagination } from 'antd'; // Import Pagination từ Ant Design
import StoreCard from '../../../Components/StoreOwner/StoreCard'; // Import ProductCard
import qs from 'qs';
import './style.scss';
import { getToken } from '../../../Utils/UserInfoUtils';
import API from '../../../Utils/API/API';
import { getDataWithToken } from '../../../Utils/FetchUtils';

const { Search } = Input;

const Store = () => {
    const token = getToken();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const [pagination, setPagination] = useState({
        current: 1, 
        pageSize: 5, 
        total: 0 
    });

    const getStoreParams = () => {
        return qs.stringify({
            storeName: searchValue,
            page: pagination.current - 1, 
            size: pagination.pageSize, 
        });
    };

    const fetchStores = async () => {
        setLoading(true);
        try {
            const queryParams = `?${getStoreParams()}`;
            const response = await getDataWithToken(API.STORE_OWNER.GET_STORE + queryParams, token);

            setData(response.content);
            setPagination((prev) => ({
                ...prev,
                total: response.totalElements, 
            }));
        } catch (error) {
            message.error('Không thể tải dữ liệu danh sách stores');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStores();
    }, [searchValue, pagination.current, pagination.pageSize]);

    const handleSearch = (e) => {
        const value = e.target.value;

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            setSearchValue(value);

            // Reset về trang đầu tiên khi tìm kiếm
            setPagination((prev) => ({
                ...prev,
                current: 1,
            }));
        }, 1000);

        setTimeoutId(newTimeoutId);
    };

    const handlePaginationChange = (page, pageSize) => {
        // Cập nhật thông tin phân trang (trang hiện tại & số item/trang)
        setPagination((prev) => ({
            ...prev,
            current: page,
            pageSize,
        }));
    };

    return (
        <div>
            <Search
                placeholder="Enter Store Name"
                onChange={handleSearch}
                enterButton
                style={{ marginBottom: 16 }}
                loading={loading}
            />
            <Spin spinning={loading}>
                <div className="product-card-container">
                    {data && data.map((store) => (
                        <StoreCard
                            key={store.storeID} // Sử dụng storeID làm key
                            urlStore={`/store/${store.storeID}/zone`} // Đường dẫn
                            storeName={store.storeName} // Tên cửa hàng
                            storeStatus={store.status === 'ACTIVE' ? 'Active' : 'Inactive'} // Trạng thái
                            urlImg={store.imageUrl || 'https://via.placeholder.com/150'} // Ảnh mặc định nếu không có ảnh
                        />
                    ))}
                </div>
            </Spin>
            {/* Ant Design Pagination */}
            <div className="pagination-container">
                <Pagination
                    current={pagination.current} 
                    pageSize={pagination.pageSize} 
                    total={pagination.total} 
                    onChange={handlePaginationChange} 
                    showSizeChanger 
                    pageSizeOptions={['1', '2', '3', '4', '5']} 
                />
            </div>
        </div>
    );
};

export default Store;