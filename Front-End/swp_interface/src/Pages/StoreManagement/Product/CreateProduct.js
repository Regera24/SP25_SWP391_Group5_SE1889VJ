import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, message, Select, Upload } from 'antd';
import API from '../../../Utils/API/API';
import { getToken } from '../../../Utils/UserInfoUtils';
import { handleUpload } from '../../../Utils/FetchUtils';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CreateProductAttribute from '../../../Pages/StoreManagement/ProductAttribute/CreateProductAttribute';


const CreateProduct = ({ onClose, storeID, fetchProducts }) => {
  const token = getToken();
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [productAttributes, setproductAttributes] = useState(null);
  const [zones, setZones] = useState([]);

  // Helper function for displaying errors
  const error = (msg, messageApi) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  // Helper function for displaying success
  const success = (msg, messageApi) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };


  // Lấy danh sách danh mục
  useEffect(() => {
    fetch(`${API.STORE_DETAIL.GET_CATEGORIES_BY_STOREID}?storeID=${storeID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Không thể lấy danh sách danh mục.');
        return response.json();
      })
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh mục:', error);
        message.error('Không thể tải danh sách danh mục.');
      });
  }, [storeID, token]);

  // Lấy thông tin sản phẩm theo storeID
  useEffect(() => {
    fetch(`${API.STORE_DETAIL.GET_STORE_PRODUCT_ATTRIBUTES}?storeID=${storeID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Không thể lấy thông tin sản phẩm.');
        return response.json();
      })
      .then((data) => {
        console.log(data.content);
        setproductAttributes(data.content.map((item) => ({
          value: item.id,
          label: item.value
        })))
      })
      .catch((error) => {
        console.error('Lỗii khi lấy thông tin sản phẩm:', error);
        message.error('Không thể tải thông tin sản phẩm.');
      });
  }, [storeID, token]);

  //Lấy thông tin zone
  useEffect(() => {
    fetch(`${API.STORE_DETAIL.GET_STORE_ZONES}?storeID=${storeID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Không thể lấy thông tin zone.');
        return response.json();
      })
      .then((data) => {
        setZones(data.content)
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin zone:', error);
        message.error('Không thể tải thông tin zone.');
      });
  }, [storeID, token]);

  // Xử lý upload ảnh
  const handleUploadImage = async (info) => {
    if (info.fileList.length > 0) {
      if (!info.fileList[0].originFileObj.type.startsWith('image/')) {
        message.error('Only accept image file!'); // Use message directly
        return;
      }
      const fileSize = info.fileList[0].originFileObj.size / 1024 / 1024 < 10;
      if (!fileSize) {
        message.error('Image file size over 10MB!'); // Use message directly
        return;
      }
      setFile(info.fileList);
    } else {
      setFile(null);
    }
  };

  // Xử lý submit form
  const handleCreateProduct = async (values) => {
    setLoading(true); // Start loading
    console.log(values)
    try {
      let imageUrl = null;
      if (file) {
        const uploadResult = await handleUpload(API.PUBLIC.UPLOAD_IMG, file[0].originFileObj);
        imageUrl = uploadResult.data; // Assuming the URL is in uploadResult.data
      }
      const newProductData = {
        name: values.name,
        price: values.price,
        information: values.information,
        quantity: values.quantity,
        productImage: imageUrl,  // Use the uploaded image URL
        categoryID: values.categoryID,
        storeID: storeID,
        productAttributeList: values.productAttributes ? values.productAttributes : [],
        zoneList: values.storeDetailZoneDTOList ? values.storeDetailZoneDTOList : []
      };


      const response = await fetch(API.STORE_DETAIL.GET_STORE_PRODUCTS_BY_STOREID + '?storeID=' + storeID, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProductData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Không thể tạo sản phẩm mới');
      }

      message.success('Tạo sản phẩm mới thành công!');
      fetchProducts();
      onClose();
      form.resetFields();
    } catch (err) {
      console.error('Lỗi khi tạo sản phẩm mới: ', err);
      message.error(err.message || 'Có lỗi xảy ra khi tạo sản phẩm mới');
    } finally {
      setLoading(false); // Stop loading, regardless of success or failure
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {
        productAttributes!=null && (
          <Form style={{ width: '100%' }} form={form} layout="vertical" onFinish={handleCreateProduct}>
            <Form.Item
              label="Tên Sản Phẩm"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
            >
              <InputNumber min={0} placeholder="Nhập giá" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Mô Tả"
              name="information"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
            >
              <Input placeholder="Nhập mô tả" />
            </Form.Item>

            <Form.Item
              label="Số Lượng"
              name="quantity"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
            >
              <InputNumber min={0} placeholder="Nhập số lượng" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Thuộc Tính Của Sản Phẩm"
              name="productAttributes"
            >
              <Select mode="multiple" placeholder="Chọn thuộc tính của sản phẩm" allowClear options={productAttributes}></Select>
            </Form.Item>

            <Form.Item
              label="Hình Ảnh"
              name="productImage"
            >
              <Upload
                beforeUpload={() => false}
                onChange={handleUploadImage}
                maxCount={1}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Tải ảnh sản phẩm lên</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Danh Mục"
              name="categoryID"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
            >
              <Select placeholder="Chọn danh mục">
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.description}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Khu vực"
              name="storeDetailZoneDTOList"
            >
              <Select mode='multiple' placeholder="Chọn khu vực để gạo">
                {zones.map((zone) => (
                  <Select.Option key={zone.id} value={zone.id}>
                    {zone.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
                Tạo Sản Phẩm
              </Button>
            </Form.Item>
          </Form>
        )
      }
    </>
  );
};

export default CreateProduct;