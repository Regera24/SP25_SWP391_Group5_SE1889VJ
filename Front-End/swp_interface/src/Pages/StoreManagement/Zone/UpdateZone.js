import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, message, Select } from 'antd';
import API from '../../../Utils/API/API';
import { getToken } from '../../../Utils/UserInfoUtils';

const UpdateZone = ({ zone, onClose, fetchZones }) => {
  const token = getToken();
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetch(`${API.STORE_DETAIL.GET_STORE_PRODUCTS_BY_STOREID}?storeID=${zone.storeID}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Không thể lấy danh sách sản phẩm.');
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error('Lỗi khi lấy sản phẩm:', error);
        message.error('Không thể tải danh sách sản phẩm.');
      });

    form.setFieldsValue({
      name: zone.name,
      location: zone.location,
      quantity: zone.quantity,
      size: zone.size,
      productID: zone.productID,
    });
  }, [zone, token, form]);

  const handleUpdateZone = async (values) => {
    const updatedZoneData = {
      name: values.name,
      location: values.location,
      quantity: values.quantity,
      size: values.size,
      storeID: zone.storeID,
      productID: values.productID,
    };

    try {
      const response = await fetch(`${API.STORE_DETAIL.GET_STORE_ZONES}/${zone.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedZoneData),
      });

      if (!response.ok) throw new Error('Không thể cập nhật zone');
      message.success('Cập nhật zone thành công!');
      fetchZones(); // Cập nhật danh sách zones
      onClose(); // Đóng modal
    } catch (error) {
      console.error('Lỗi khi cập nhật zone: ', error);
      message.error('Có lỗi xảy ra khi cập nhật zone');
    }
  };

  // Hàm xử lý khi submit form
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (values.quantity < 0) {
          message.error('Số lượng phải lớn hơn hoặc bằng 0!');
          return;
        }
        if (values.size < 1) {
          message.error('Kích thước phải lớn hơn hoặc bằng 1!');
          return;
        }
  
        console.log('Dữ liệu hợp lệ:', values);
        handleUpdateZone(values);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
        message.error('Vui lòng kiểm tra lại các trường nhập liệu!');
      });
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Tên Khu" name="name" rules={[{ required: true, message: <i>Vui lòng nhập tên khu!</i> }]}>
        <Input placeholder="Nhập tên khu" />
      </Form.Item>
      <Form.Item label="Phân Khu" name="location" rules={[{ required: true, message: <i>Vui lòng nhập phân khu!</i> }]}>
        <Input placeholder="Nhập phân khu" />
      </Form.Item>
      <Form.Item
        label="Số Lượng"
        name="quantity"
        rules={[
          { required: true, message: "Hãy nhập số lương"},
        ]}>
        <InputNumber min={0} placeholder="Nhập số lượng" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Kích Thước" name="size" rules={[{ required: true, message: <i>Vui lòng nhập kích thước!</i> }]}>
        <InputNumber type='number' min={1} placeholder="Nhập kích thước" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Sản phẩm" name="productID" rules={[{ required: true, message: <i>Vui lòng chọn sản phẩm!</i> }]}>
        <Select placeholder="Chọn sản phẩm">
          {products.map((product) => (
            <Select.Option key={product.productID} value={product.productID}>
              {product.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Cập Nhật Zone
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateZone;