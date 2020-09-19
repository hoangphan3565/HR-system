import React from 'react';
import { Tag, Tooltip, Button, Modal, Form, Input, Select, DatePicker,notification, Popconfirm } from 'antd';
import { SolutionOutlined, ManOutlined, WomanOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
const Item = (props) => {
    const [visible, setVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const { Option } = Select;
    const [updateModal,setUpdateModal]=useState(false);
    const onFinish = () => {
        setUpdateModal(false);
        const args = {
            message: 'Created Successfully',
            description:
                'A new employee was created in Your System !',
            duration: 1,
        };
        notification.open(args);
    }
    const onDelete=()=>{
        const args = {
            message: 'Deleted Successfully',
            description:
                'A new employee was deleted in Your System !',
            duration: 1,
        };
        notification.open(args);
    }
    const updateShowModal = () => {
        updateModal === false ? setUpdateModal(true) : setUpdateModal(false);
    }

    const toggleVisible = () => {
        setVisible(true);
    }
    const toggleAddVisible = () => {
        setAddVisible(true);
    }
    const handleCancel = () => {
        setVisible(false);
    }
    const handleAddCancel = () => {
        setAddVisible(false);
    }
    const check = (a) => {
        if (a === "1") {
            return (
                <Tag color="gold">1</Tag>
            );
        }
        if (a === "2") {
            return (
                <Tag color="geekblue">2</Tag>
            );
        }
        if (a === "") {
            return (
                <Tag color="pink">Not Update</Tag>
            );
        }
    }
    return (
        <tr key={props.e.id}>
            <td>{props.e.emplid}</td>
            <td>{props.e.code}</td>
            <td>{props.e.firstName}</td>
            <td>
                {props.e.lastName}
            </td>
            <td>
                {
                    props.e.gender === "MALE" ? <Tag color="geekblue" icon={<ManOutlined />}></Tag> : <Tag color="orange" icon={<WomanOutlined />}></Tag>
                }
            </td>
            <td>{props.e.startDate}</td>
            <td>{props.e.endDate}</td>
            <td>{
                check(props.e.createBy)
            }</td>
            <td>{check(props.e.modifyBy)}</td>
            <td>
                <Tooltip title="Update!">
                    <Button
                        shape="circle"
                        icon={<SolutionOutlined />}
                        onClick={updateShowModal}
                        style={{ backgroundColor: "rgb(107, 189, 243)" }}
                    />
                    <Modal
                        visible={updateModal}
                        title="Employee Information"
                        onCancel={handleAddCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Cancel
                          </Button>,
                            <Button key="submit" type="primary" onClick={onFinish}>
                                Update
                          </Button>
                        ]}
                    >
                        <Form {...layout}>
                            <Form.Item
                                label="Code"
                                name="code"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input size="middle" />
                            </Form.Item>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input size="middle" />
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input size="middle" />
                            </Form.Item>
                            <Form.Item label="Gender" name="gender">
                                <Select defaultValue={"MALE"}>
                                    <Option value="MALE">Male</Option>
                                    <Option value="FEMALE">Female</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Start Date">
                                <DatePicker
                                    style={{ width: 354 }}
                                />
                            </Form.Item>
                            <Form.Item label="End Date">
                                <DatePicker
                                    style={{ width: 354 }}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Tooltip>
                <Tooltip title="Delete!">
                   <Popconfirm title="Are you sure to delete this employee!" placement="topRight" onConfirm={onDelete}>
                   <Button
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={toggleAddVisible}
                        style={{ backgroundColor: "rgb(236, 118, 82)" }}
                    />
                   </Popconfirm>
                </Tooltip>
            </td>
        </tr>
    );
}

export default Item;