import React, { useEffect, useState } from "react";
import { Modal, Spin, message, Card, Image, Descriptions, Tag, List, Button } from "antd";
import './style.scss';
import API from "../../../Utils/API/API";
import { getToken } from "../../../Utils/UserInfoUtils";
import { getDataWithToken } from "../../../Utils/FetchUtils";
import rice_default from '../../../assets/img/rice_default.jpg';
import { useNavigate } from "react-router-dom";

const ProductDetailModal = ({ visible, productID, onClose }) => {
    const token = getToken();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProductDetail = async () => {
            setLoading(true);
            try {
                const response = await getDataWithToken(
                    `${API.STORE_OWNER.GET_STORE_PRODUCT_DETAIL}?id=${productID}`,
                    token
                );
                setProduct(response);
            } catch (error) {
                message.error("Không thể tải chi tiết sản phẩm");
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        if (visible && productID) {
            fetchProductDetail();
        } else {
            setProduct(null);
        }
    }, [visible, productID, token]);

    const handleEdit = () => {
        message.info(`Chỉnh sửa sản phẩm với ID: ${productID}`);
        navigate(`/store-owner/product/update/${productID}`); 
    };

    const handleDelete = () => {
        message.warning(`Xóa sản phẩm với ID: ${productID}`);
        // Thêm logic xóa ở đây, ví dụ gọi API DELETE rồi đóng Modal
        // Ví dụ:
        // await deleteProduct(productID, token);
        // onClose();
    };

    return (
        <Modal
            title="Chi tiết sản phẩm"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="edit" type="primary" onClick={handleEdit}>
                    Chỉnh sửa
                </Button>,
                <Button key="delete" danger onClick={handleDelete}>
                    Xóa
                </Button>,
            ]}
            width={800}
        >
            {loading ? (
                <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
            ) : product ? (
                <div className="product-detail-container">
                    <div className="product-image">
                        <Image
                            width={300}
                            src={product.productImage || rice_default}
                            alt={product.name}
                            style={{ objectFit: "cover" }}
                            preview={{
                                mask: <span>Xem ảnh lớn</span>,
                                maskClassName: "custom-preview-mask",
                                scaleStep: 1,
                                maxScale: 10,
                            }}
                        />
                    </div>
                    <div className="product-info">
                        <Card title={product.name}>
                            <Descriptions column={1} bordered>
                                <Descriptions.Item label="Giá">
                                    {product.price.toLocaleString()} ₫
                                </Descriptions.Item>
                                <Descriptions.Item label="Loại gạo">
                                    {product.category.name}
                                </Descriptions.Item>
                                <Descriptions.Item label="Số lượng">
                                    {product.quantity} kg
                                </Descriptions.Item>
                            </Descriptions>
                            <div className="product-attributes">
                                <strong>Thuộc tính:</strong>
                                {product.attributes.map((attr) => (
                                    <Tag key={attr.id} color="blue">{attr.value}</Tag>
                                ))}
                            </div>
                            <div className="product-description">
                                <strong>Mô tả:</strong>
                                <p>{product.information}</p>
                            </div>
                            <div className="store-info">
                                <strong>Cửa hàng:</strong>
                                <List
                                    dataSource={[product.store]}
                                    renderItem={(store) => (
                                        <List.Item>
                                            {store.name}
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            ) : (
                <p style={{ textAlign: "center" }}>Không tìm thấy sản phẩm</p>
            )}
        </Modal>
    );
};

export default ProductDetailModal;