import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import API from '../../../Utils/API/API';
import { getToken } from '../../../Utils/UserInfoUtils';

const CreateProductAttribute = ({ onClose, storeID, fetchAttributes }) => {
  const token = getToken();
  const [form] = Form.useForm();
  
  const handleCreateProductAttribute = async (values) => {
    const newAttributeData = {
      value: values.value, // tên thuộc tính
      storeID: storeID,
    };

    try {
      const response = await fetch(API.STORE_DETAIL.GET_STORE_PRODUCT_ATTRIBUTES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newAttributeData),
      });

      if (!response.ok) throw new Error('Không thể tạo thuộc tính sản phẩm mới');
      message.success('Tạo thuộc tính sản phẩm mới thành công!');
      fetchAttributes(); // Cập nhật danh sách thuộc tính sản phẩm
      onClose(); // Đóng modal
      form.resetFields();
    } catch (error) {
      console.error('Lỗi khi tạo thuộc tính sản phẩm mới: ', error);
      message.error('Có lỗi xảy ra khi tạo thuộc tính sản phẩm mới');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleCreateProductAttribute}>
      <Form.Item 
        label="Tên Thuộc Tính" 
        name="value" 
        rules={[{ required: true, message: <i>Vui lòng nhập tên thuộc tính!</i> }]}
      >
        <Input placeholder="Nhập tên thuộc tính" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Tạo Mới Thuộc Tính
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProductAttribute;
