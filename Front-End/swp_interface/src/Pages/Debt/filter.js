import { Button, Select, Form, Input, Row, Col, DatePicker } from 'antd';
import dayjs from 'dayjs';

function Filter(props){
    const { params, setParams, store } = props;
    
    const onFormChange = (changedValues, allValues) => {
      const filterParams = Object.fromEntries(
        Object.entries(allValues).filter(
          ([_, value]) => value !== undefined && value !== null && 
          (typeof value !== 'string' || value.trim() !== '')
        )
      );
    
      if (filterParams.startCreatedAt) {
        filterParams.startCreatedAt = dayjs(filterParams.startCreatedAt).format('YYYY-MM-DD');
      }
    
      if (filterParams.endCreatedAt) {
        filterParams.endCreatedAt = dayjs(filterParams.endCreatedAt).format('YYYY-MM-DD');
      }
    
      const queryString = new URLSearchParams(filterParams).toString();
      console.log(queryString);
      setParams(queryString);
    };

    const options = [
      {
        value: 'POSITIVE',
        label: 'Positive',
      },
      {
        value: 'NEGATIVE',
        label: 'Negative',
      }
      ];

    return (
      <>
      <Form onValuesChange={onFormChange} name="basic" layout="vertical">
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item label="Debt Number" name="number">
              <Input />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label="Debt Type" name="type">
              <Select allowClear options={options}/>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label="Amount From" name="fromAmount">
              <Input type='number'/>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item label="Amount To" name="toAmount">
              <Input type='number'/>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="Customer" name="customerName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="Store" name="storeId">
              <Select allowClear options={store}/>
            </Form.Item>
          </Col>

          <Col span={2}>
            <Form.Item label="Created By" name="createdBy">
              <Input />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item label="Created From" name="startCreatedAt">
              <DatePicker format="YYYY-MM-DD" 
                  onChange={(date, dateString) => console.log(dateString)}  
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="Created To" name="endCreatedAt">
              <DatePicker format="YYYY-MM-DD" 
                  onChange={(date, dateString) => console.log(dateString)}  />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default Filter;