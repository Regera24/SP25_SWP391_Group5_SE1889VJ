import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, message, Card, Input, Button, Form, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

import API from "../../../Utils/API/API";
import { getToken } from "../../../Utils/UserInfoUtils";
import { getDataWithToken } from "../../../Utils/FetchUtils";

import "./style.scss";

const { Option } = Select;

const ProductUpdate = () => {
    const { productID } = useParams();
    const navigate = useNavigate();
    const token = getToken();

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [attribute, setAttribute] = useState([]);
    const [form] = Form.useForm();
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
                    attributes: response.attributes
                        ? response.attributes.map((attr) => attr.value)
                        : [],
                    storeName: response.store?.name,
                    productImage: response.productImage, // Ảnh cũ để hiển thị nếu cần
                });
            } catch (error) {
                message.error("Không thể tải chi tiết sản phẩm");
                navigate("/store-owner/product");
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

        const fetchAttributes = async () => {
            try {
                const response = await getDataWithToken(API.STORE_OWNER.GET_ATTRIBUTES, token);
                setAttribute(response);
            } catch (error) {
                message.error("Không thể tải danh sách thuộc tính");
            }
        };

        if (productID) {
            fetchProductDetail();
            fetchCategories();
        }
    }, [productID, token, form, navigate]);

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();

            // Thêm các trường dữ liệu vào FormData
            formData.append("productID", productID);
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("categoryId", values.category);
            formData.append("information", values.information || "");
            formData.append("attributes", JSON.stringify(values.attributes || []));

            // Nếu có file ảnh mới, thêm vào FormData
            if (values.productImage && values.productImage.length > 0) {
                const file = values.productImage[0].originFileObj;
                formData.append("file", file);
            }

            // Gửi request cập nhật sản phẩm
            await axios.put(`${API.STORE_OWNER.UPDATE_STORE_PRODUCT}/${productID}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            message.success("Cập nhật sản phẩm thành công");
            navigate("/store-owner/product");
        } catch (error) {
            message.error("Cập nhật sản phẩm thất bại");
        } finally {
            setLoading(false);
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

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
                            <Input type="number" min={0} step={1000} />
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="Loại gạo"
                            rules={[{ required: true, message: "Vui lòng chọn loại gạo" }]}
                        >
                            <Select placeholder="Chọn loại gạo">
                                {categories.map((cat) => (
                                    <Option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="information" label="Mô tả">
                            <Input.TextArea rows={4} maxLength={200} showCount />
                        </Form.Item>
                        <Form.Item
                            name="attributes"
                            label="Thuộc tính"
                            rules={[{ required: true, message: "Vui lòng chọn thuộc tính" }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Chọn thuộc tính"
                                options={attribute.map((attr) => ({
                                    label: attr.name,
                                    value: attr.value,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item name="storeName" label="Cửa hàng">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="quantity" label="Số lượng">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name="productImage"
                            label="Ảnh sản phẩm"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                        >
                            <Upload listType="picture-card" maxCount={1} beforeUpload={() => false}>
                                {uploadButton}
                            </Upload>
                        </Form.Item>
                        <div className="update-product-actions">
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                            <Button onClick={() => navigate("/store-owner/product")} danger>
                                Hủy
                            </Button>
                        </div>
                    </Form>
                </Card>
            )}
        </div>
    );
};

export default ProductUpdate;