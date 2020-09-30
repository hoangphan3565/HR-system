import React, { useRef } from "react";
import {
  Tooltip,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  notification,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "./css/styles.css";
import { useEffect } from "react";
import PositionService from "../../Services/PositionServices";
const Item = (props) => {
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const id = useRef();
  const name = useRef();
  const [pos, setPos] = useState([]);
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { Option } = Select;
  const [form] = Form.useForm();

  const toggleUpdateVisible = () => {
    setUpdateVisible(true);
  };
  const handleEmplCancel = () => {
    setVisible(false);
  };
  const [id1,setId1]=useState("");
  useEffect(()=>{
    setId1(localStorage.getItem("id"))
  })
  const onDelete = () => {
    const args = {
      message: "Deleted Successfully",
      description: "A new employee was deleted in Your System !",
      duration: 1
    };
    
    PositionService.del(props.e.pos_ID,id1).then((res) => {
      props.test("done");
      props.test("");
      notification.success(args);
    }); 
  };
  const handleUpdateCancel = () => {
    setUpdateVisible(false);
  };
  const onFinish = () => {
    const position = {
      pos_ID: id.current.props.value,
      positionName: name.current.props.value,
    };
    const args = {
      message: "Updateed Successfully",
      description: "This position was updated in Your System !",
      duration: 1,
    };
    console.log(position);
    PositionService.update(props.e.pos_ID,id1,position).then((res) => {
      if(res.status===200){
        setUpdateVisible(false);
        props.test("done");
        props.test("");
        notification.success(args);
        form.resetFields();
      }
    });
  };
  useEffect(() => {
    form.setFieldsValue({
      pos_ID: props.e.pos_ID,
      positionName: props.e.positionName,
    });
  });
  useEffect(() => {
    PositionService.list().then((res) => {
      setPos(res.data);
    });
  }, []);
  return (
    <tr key={props.e.pos_ID}>
      <td>{props.e.pos_ID}</td>
      <td>{props.e.positionName}</td>
      <td>
        <Tooltip title="Update!">
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={toggleUpdateVisible}
            style={{ backgroundColor: "rgb(107, 189, 243)" }}
          />
          <Modal
            visible={updateVisible}
            title="Update Position"
            onCancel={handleUpdateCancel}
            footer={[
              <Button key="back" onClick={handleEmplCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={onFinish}
              >
                Update
              </Button>,
            ]}
          >
            <Form {...layout} form={form} onFinish={onFinish}>
              <Form.Item
                label="Id"
                name="pos_ID"
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input size="middle" ref={id} readOnly />
              </Form.Item>
              <Form.Item
                label="Name"
                name="positionName"
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input size="middle" ref={name} />
              </Form.Item>
            </Form>
          </Modal>
        </Tooltip>
        <Tooltip title="Delete">
          <Popconfirm
            placement="top"
            title="Are you sure delete this position    !"
            onConfirm={onDelete}
          >
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              style={{ backgroundColor: "rgb(236, 118, 82)" }}
            />
          </Popconfirm>
        </Tooltip>
      </td>
    </tr>
  );
};

export default Item;
