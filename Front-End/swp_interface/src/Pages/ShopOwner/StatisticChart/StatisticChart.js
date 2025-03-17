import React from 'react';
import { Card, Row, Col } from 'antd';
import ChartComponent from '../../../Components/StoreOwner/ChartComponent/ChartComponent';
import API from '../../../Utils/API/API';
import './style.scss'; 

const StatisticChart = () => {
    return (
        <div className="statistic-chart-page"> 
            <Row gutter={[0, 24]}>
                <Col span={24}>
                    <Card
                        title="Thống kê theo loại giao dịch"
                        bordered={false}
                        className="statistic-card" 
                    >
                        <ChartComponent
                            apiUrl={`${API.STORE_OWNER.GET_STORE_STATISTIC_CHART}/by-description`}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card
                        title="Thống kê theo trạng thái thanh toán"
                        bordered={false}
                        className="statistic-card" 
                    >
                        <ChartComponent
                            apiUrl={`${API.STORE_OWNER.GET_STORE_STATISTIC_CHART}/by-type`}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StatisticChart;