import React from 'react';
import { Form, Input, Row, Col, DatePicker } from 'antd';
import dayjs from 'dayjs';

function Filter(props) {
    const { params, setParams } = props;

    // Hàm xử lý khi form thay đổi
    const onFormChange = (changedValues, allValues) => {
        // Lọc các giá trị không null, không undefined, và không rỗng
        const filterParams = Object.fromEntries(
            Object.entries(allValues).filter(
                ([_, value]) =>
                    value !== undefined &&
                    value !== null &&
                    (typeof value !== 'string' || value.trim() !== '')
            )
        );
        // Định dạng ngày tháng nếu có
        if (filterParams.fromCreatedAt) {
            filterParams.fromCreatedAt = dayjs(filterParams.fromCreatedAt).format('YYYY-MM-DD');
        }
        if (filterParams.toCreatedAt) {
            filterParams.toCreatedAt = dayjs(filterParams.toCreatedAt).format('YYYY-MM-DD');
        }
        if (filterParams.fromUpdatedAt) {
            filterParams.fromUpdatedAt = dayjs(filterParams.fromUpdatedAt).format('YYYY-MM-DD');
        }
        if (filterParams.toUpdatedAt) {
            filterParams.toUpdatedAt = dayjs(filterParams.toUpdatedAt).format('YYYY-MM-DD');
        }

        // Tạo chuỗi query string từ các tham số lọc
        const queryString = new URLSearchParams(filterParams).toString();
        console.log(queryString); // Kiểm tra chuỗi query
        setParams(queryString); // Cập nhật params cho component cha
    };

    return (
        <Form onValuesChange={onFormChange} name="filter" layout="vertical">
            <Row gutter={12}>
                <Col span={3}>
                    <Form.Item label="Tên khu vực" name="name">
                        <Input placeholder="Nhập tên khu vực" />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label="Thông tin khu vực" name="location">
                        <Input placeholder="Nhập thông tin khu vực" />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item label="Ngày tạo từ" name="fromCreatedAt">
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item label="Ngày tạo đến" name="toCreatedAt">
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item label="Ngày cập nhật từ" name="fromUpdatedAt">
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item label="Ngày cập nhật đến" name="toUpdatedAt">
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default Filter;