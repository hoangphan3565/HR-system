import React, { useRef } from "react";
import {
  Tag,
  Tooltip,
  Button,
  Modal,
  Form,
  Input,
  Select,
  TimePicker,
  Popconfirm,
  Statistic,
  Card,
  notification,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";

import ShiftService from "../../Services/ShiftService";
const Item = (props) => {
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const id = useRef();
  const name = useRef();
  const code = useRef();
  const [sh, setShift] = useState([]);
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const [form] = Form.useForm();

  const toggleUpdateVisible = () => {
    setUpdateVisible(true);
  };
  const handleEmplCancel = () => {
    setVisible(false);
  };
  const onDelete = () => {
    ShiftService.del(props.e.sif_ID).then((res) => {
      props.test("done");
      props.test("");
    });
    const args = {
      message: "Deleted Successfully",
      description: "A new shift was deleted in Your System !",
      duration: 1,
      icon: <DeleteOutlined />,
    };
    notification.open(args);
  };
  const handleUpdateCancel = () => {
    setUpdateVisible(false);
  };
  const onFinish = () => {
    const sif = {
      shiftName: name.current.props.value,
      shiftCode: code.current.props.value,
    };
    console.log(sif);
    const args = {
      message: "Updateed Successfully",
      description: "This shift was updated in Your System !",
      duration: 1,
    };
    ShiftService.update(props.e.sif_ID, sif).then((res) => {
      props.test("done");
      props.test("");
      setUpdateVisible(false);
    }, notification.open(args));
  };
  useEffect(() => {
    form.setFieldsValue({
      sif_ID: props.e.sif_ID,
      shiftName: props.e.shiftName,
      shiftCode: props.e.shiftCode,
    });
  });
  useEffect(() => {
    ShiftService.list().then((res) => {
      setShift(res.data);
    });
  }, []);

  return (
    <tr key={props.e.sif_ID}>
      <td>{props.e.sif_ID}</td>
      <td>{props.e.shiftCode}</td>
      <td>{props.e.shiftName}</td>

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
            title="Update Shift"
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
              <Form.Item label="ID" name="sif_ID" hasFeedback>
                <Input size="middle" ref={id} readOnly />
              </Form.Item>
              <Form.Item label="Shift Code" name="shiftCode" hasFeedback>
                <Input size="middle" ref={code} />
              </Form.Item>
              <Form.Item label="Shift Name" name="shiftName" hasFeedback>
                <Input size="middle" ref={name} />
              </Form.Item>
            </Form>
          </Modal>
        </Tooltip>
        <Tooltip title="Delete">
          <Popconfirm
            placement="top"
            title="Are you sure delete this shift    !"
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
