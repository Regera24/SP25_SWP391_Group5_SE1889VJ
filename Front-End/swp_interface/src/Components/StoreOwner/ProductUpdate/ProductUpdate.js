import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, message, Card, Input, Button, Form, Select, Upload, Image, Descriptions, Tag, List } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import API from "../../../Utils/API/API";
import { getToken } from "../../../Utils/UserInfoUtils";
import { getDataWithToken } from "../../../Utils/FetchUtils";
import axios from "axios";
import './style.scss';

const { Option } = Select;

const ProductUpdate = () => {
    const { productID } = useParams();
    const navigate = useNavigate();
    const token = getToken();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const fetchProductDetail = async () => {
            setLoading(true);
            try {
                const response = await getDataWithToken(
                    `${API.STORE_OWNER.GET_STORE_PRODUCT_DETAIL}?id=${productID}`,
                    token
                );
                form.setFieldsValue({
                    ...response,
                    category: response.category?.id,
                    attributes: response.attributes ? response.attributes.map(attr => attr.value) : [],
                    storeName: response.store?.name,
                });
                if (response.productImage) {
                    setFileList([{ uid: '-1', name: 'image.png', status: 'done', url: response.productImage }]);
                }
            } catch (error) {
                message.error("Không thể tải chi tiết sản phẩm");
                navigate("/products");
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await getDataWithToken(API.STORE_OWNER.GET_CATEGORIES, token);
                setCategories(response);
            } catch (error) {
                message.error("Không thể tải danh sách danh mục");
            }
        };

        if (productID) {
            fetchProductDetail();
            fetchCategories();
        }
    }, [productID, token, form, navigate]);

    // Cập nhật hàm PUT: gửi payload dạng JSON
    const putDataWithToken = async (url, data, token) => {
        try {
            const response = await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
            throw error;
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const payload = {
                productID: productID,
                name: values.name,
                price: values.price,
                categoryId: values.category,
                information: values.information || '',
                status: values.status,
                attributes: values.attributes
            };

            await putDataWithToken(`${API.STORE_OWNER.UPDATE_STORE_PRODUCT}/${productID}`, payload, token);
            message.success("Cập nhật sản phẩm thành công");
            navigate("/products");
        } catch (error) {
            message.error("Cập nhật sản phẩm thất bại");
        } finally {
            setLoading(false);
        }
    };

    const uploadProps = {
        onRemove: () => setFileList([]),
        beforeUpload: (file) => {
            setFileList([file]);
            return false; 
        },
        fileList,
    };

    return (
        <div className="update-product-container">
            {loading ? (
                <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
            ) : (
                <Card title="Cập nhật sản phẩm" className="update-product-card">
                    <Form form={form} layout="vertical" onFinish={handleUpdate}>
                        <Form.Item
                            name="name"
                            label="Tên sản phẩm"
                            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Giá"
                            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                        >
                            <Input type="number" min={0} step={1000}/>
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="Loại gạo"
                            rules={[{ required: true, message: "Vui lòng chọn loại gạo" }]}
                        >
                            <Select placeholder="Chọn loại gạo">
                                {categories.map(cat => (
                                    <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="information"
                            label="Mô tả"
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="Trạng thái"
                            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                        >
                            <Select placeholder="Chọn trạng thái">
                                <Option value="available">Còn hàng</Option>
                                <Option value="out_of_stock">Hết hàng</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="attributes"
                            label="Thuộc tính"
                        >
                            <Select mode="tags" placeholder="Nhập thuộc tính">
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="storeName"
                            label="Cửa hàng"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Ảnh sản phẩm">
                            <Upload {...uploadProps} listType="picture">
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>
                        <div className="update-product-actions">
                            <Button type="primary" htmlType="submit">Cập nhật</Button>
                            <Button onClick={() => navigate("/products")} danger>Hủy</Button>
                        </div>
                    </Form>
                </Card>
            )}
        </div>
    );
};

export default ProductUpdate;
