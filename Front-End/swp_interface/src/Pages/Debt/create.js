import { Form, Input, Button, InputNumber, Select, notification, message, Upload  } from "antd";
import { addNewResource, handleUpload } from "../../Utils/FetchUtils";
import { getToken } from "../../Utils/UserInfoUtils";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { error } from "../../Utils/AntdNotification";
import API from "../../Utils/API/API";
import Loading from "../Loading/Loading";

function Create(props){
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [file,setFile] = useState(null);
  const token = getToken();
  const { store, customer, setIsCreateOpen, displayNotification } = props;
  const [form] = Form.useForm();

  const handleFinish = async (values) =>{
    if(file){
      setLoading(true);
      const res = await handleUpload(API.PUBLIC.UPLOAD_IMG, file[0].originFileObj);
      if(res && res.code===200){
        const response = await addNewResource('http://localhost:9999/debt', {...values, image: res.data}, token);
        if(response){
          form.resetFields()
          setIsCreateOpen(false);
          displayNotification(response.data);
          setLoading(false);
        }
      }
    }else{
      setLoading(true);
      const response = await addNewResource('http://localhost:9999/debt', values, token);
      if(response){
        form.resetFields()
        setIsCreateOpen(false);
        displayNotification(response.data);
        setLoading(false);
      }
    }
  }

  const handleChangeFile = async (info) =>{
      if(info.fileList.length > 0){
        if(!info.fileList[0].originFileObj.type.startsWith('image/')){
          error('Trường chỉ chấp nhận file ảnh!', messageApi);
          return;
        }
        const fileSize = info.fileList[0].originFileObj.size / 1024 / 1024 < 10
        if(!fileSize){
          error('File không được quá 10MB!', messageApi);
          return;
        }
        setFile(info.fileList);
      }else{
        setFile(null);
      }
    }

  const handleCancel = () => {
    form.resetFields()
    setIsCreateOpen(false);
  }

  const options = [
    {
      value: 'POSITIVE_KH_TRA',
      label: 'Khách hàng trả cửa hàng',
    },
    {
      value: 'POSITIVE_CH_VAY',
      label: 'Cửa hàng vay khách hàng',
    },
    {
      value: 'NEGATIVE_KH_VAY',
      label: 'Khách hàng vay cửa hàng',
    },
    {
      value: 'NEGATIVE_CH_TRA',
      label: 'Cửa hàng trả khách hàng',
    }
    ];
  return (
    <>
    {loading && <Loading />}
    {contextHolder}
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Số tiền"
          name="amount"
          rules={[
            { required: true, message: "Vui lòng nhập số tiền!" },
            { type: "number", min: 1, message: "Số tiền phải lớn hơn 0 đ!" },
            { type: "number", max: 1000000000, message: "Số tiền phải nhỏ hơn 1.000.000.000 đ!" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="Nhập số tiền" />
        </Form.Item>

        <Form.Item
          label="Loại giao dịch"
          name="type"
          rules={[{ required: true, message: "Vui lòng nhập loại giao dịch!" }]}
        >
          <Select options={options}/>
        </Form.Item>

        <Form.Item
          label="Mã khách hàng"
          name="customerId"
          rules={[{ required: true, message: "Vui lòng nhập khách hàng!" }]}
        >
          <Select optionFilterProp="label" 
            filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())} 
            options={customer} showSearch placeholder="Nhập mã khách hàng" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description"
          rules={[
            { max: 1000, message: 'Mô tả không được vượt quá 1000 ký tự!' },
            {
              validator: (_, value) => {
                if (value && value.trim().length === 0) {
                  return Promise.reject(new Error('Mô tả không được chỉ chứa khoảng trắng!'));
                }
                return Promise.resolve();
              },
            }
          ]}
        >
          <Input.TextArea placeholder="Nhập mô tả (nếu có)" />
        </Form.Item>

        <Form.Item
          name="image"
          className='register__form__item'
        >
          <Upload beforeUpload={() => false} fileList={file} onChange={handleChangeFile} maxCount={1} listType="picture">
            <Button icon={<UploadOutlined />}>Click to Upload Image</Button>
          </Upload>
        </Form.Item>

        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Form.Item>
            <Button onClick={handleCancel} style={{margin:'0px 10px'}} type="primary">
              Hủy 
            </Button>
          </Form.Item>
          <Form.Item>
            <Button style={{margin:'0px 10px'}} type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}

export default Create;