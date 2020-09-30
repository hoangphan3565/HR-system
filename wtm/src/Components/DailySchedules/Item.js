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
import {
  SolutionOutlined,
  EditOutlined,
  UsergroupDeleteOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import PositionService from "../../Services/PositionServices";
import axios from "axios";
import moment from "moment";
import DailyScheduleService from "../../Services/DailyScheduleService";
import UserActivityService from '../../Services/UserActivityService';
const Item = (props) => {
  //console.log(props.e);
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const id = useRef();
  const name = useRef();
  const startTime1 = useRef();
  const endTime1 = useRef();
  const [dls, setDls] = useState([]);
  const [start, setStartTime] = useState();
  const [end, setEndTime] = useState();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const [form] = Form.useForm();
  const [id1, setId] = useState("");
  useEffect(() => {
    setId(localStorage.getItem("id"))
  })
  const toggleUpdateVisible = () => {
    setUpdateVisible(true);
    setStartTime(props.e.startTime);
    setEndTime(props.e.endTime);
  };
  const handleEmplCancel = () => {
    setVisible(false);
  };
  const onDelete = () => {
    const actvity = {
      "usr_ID": id,
      "activityName": `Deleted daily schedule with name ${props.e.name}`,
      "isdeleted": false,
    };
    DailyScheduleService.del(props.e.dls_ID, 1).then((res) => {
      props.test("done");
      props.test("");
      UserActivityService.add(actvity).then();
    });
    const args = {
      message: "Deleted Successfully",
      description: "A new daily schedule was deleted in Your System !",
      duration: 1
    };
    notification.success(args);
  };
  const handleUpdateCancel = () => {
    setUpdateVisible(false);
  };
  const onFinish = () => {
    const dls = {
      "name": name.current.props.value,
      "startTime": start,
      "endTime": end,
    };
    const actvity = {
      "usr_ID": id1,
      "activityName": `Updateed daily schedule with name ${dls.name}`,
      "isdeleted": false,
    };

    const args = {
      message: "Updated Successfully",
      description: "This daily schedule was updated in Your System !",
      duration: 1,
    };
    console.log(id1);
    axios.put(`http://localhost:8080/api/dailyschedules/${props.e.dls_ID}/uid/${id1}`, dls).then(res => {
      props.test("1");
      props.test("");
      setUpdateVisible(false);
      UserActivityService.add(actvity).then();
      form.resetFields();
    })
  };
  useEffect(() => {
    form.setFieldsValue({
      dls_ID: props.e.dls_ID,
      name: props.e.name,
    });
  });
  useEffect(() => {
    DailyScheduleService.list().then((res) => {
      setDls(res.data);
    });
  }, []);

  const onChangeStart = (time, timeString) => {
    setStartTime(timeString);
  };
  const onChangeEnd = (time, timeString) => {
    setEndTime(timeString);
  };
  const format = "HH:mm:ss";
  return (
    <tr key={props.e.dls_ID}>
      <td>{props.e.dls_ID}</td>
      <td>{props.e.name}</td>
      <td>{props.e.startTime}</td>
      <td>{props.e.endTime}</td>
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
                name="dls_ID"
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input size="middle" ref={id} readOnly />
              </Form.Item>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input size="middle" ref={name} />
              </Form.Item>
              <Form.Item label="Start Time">
                <TimePicker
                  value={moment(start, format)}
                  style={{ width: 354 }}
                  format={format}
                  onChange={onChangeStart}
                  ref={startTime1}
                />
              </Form.Item>
              <Form.Item label="End Time">
                <TimePicker
                  defaultValue={moment(end, format)}
                  style={{ width: 354 }}
                  format={format}
                  onChange={onChangeEnd}
                  ref={endTime1}
                />
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
