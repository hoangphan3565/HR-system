import React from 'react';
import { Tag, Tooltip, Button, Modal, Form, Input, Select, DatePicker, Popconfirm, Statistic, Card,notification } from 'antd';
import { SolutionOutlined, EditOutlined, UsergroupDeleteOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
const Item = (props) => {
    const [visible, setVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false);
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const { Option } = Select;
    const toggleEmplVisible = () => {
        setVisible(true);
    }
    const toggleUpdateVisible = () => {
        setUpdateVisible(true);
    }
    const handleEmplCancel = () => {
        setVisible(false);
    }
    const handleUpdateCancel = () => {
        setUpdateVisible(false);
    }
    const onFinish = () => {
        setUpdateVisible(false);
        const args = {
            message: 'Updated Successfully',
            description:
                'This department was updated in Your System !',
            duration: 1,
        };
        notification.open(args);
    }
    return (
        <tr key={props.e.id}>
            <td></td>
            <td>{props.e.deptid}</td>
            <td>{props.e.deptName}</td>
            <td>{props.e.startDate}</td>
            <td>
                <Tooltip title="Update here!">
                    <Button
                        shape="circle"
                        icon={<EditOutlined />}
                        onClick={toggleUpdateVisible}
                        style={{ backgroundColor: "rgb(107, 189, 243)" }}
                    />
                    <Modal
                        visible={updateVisible}
                        title="Update Department"
                        onCancel={handleUpdateCancel}
                        footer={[
                            <Button key="back" onClick={handleEmplCancel}>
                                Cancel
                          </Button>,
                            <Button key="submit" type="primary" onClick={onFinish}>
                                Update
                          </Button>
                        ]}
                    >
                        <Form {...layout}>
                            <Form.Item
                                label="Id"
                                name="deptId"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input size="middle" />
                            </Form.Item>
                            <Form.Item
                                label="Name"
                                name="deptName"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input size="middle" />
                            </Form.Item>
                            <Form.Item
                                label="StartDate"
                                name="startDate"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <DatePicker size="middle" style={{ width: 354 }} />
                            </Form.Item>

                        </Form>
                    </Modal>
                </Tooltip>

                <Tooltip title="Employee">
                    <Button
                        shape="circle"
                        icon={<UsergroupDeleteOutlined />}
                        onClick={toggleEmplVisible}
                        style={{ backgroundColor: "orange" }} />
                    <Modal
                        visible={visible}
                        title="Employee's Department"
                        onCancel={handleEmplCancel}
                        width={1000}
                        footer={[
                            <Button key="back" onClick={handleEmplCancel}>
                                Cancel
                          </Button>,
                        ]}
                    >
                        <div className="row">
                            <div className="col-sm-4">
                                <Card>
                                    <Statistic title="Active Employees" value={12000} prefix={<UserOutlined />} valueStyle={{ color: '#3f8600' }} />
                                </Card>
                                <Card>
                                    <Statistic title="Absent Employees" value={3} prefix={<UserOutlined />} valueStyle={{ color: '#cf1322' }} />
                                </Card>

                            </div>
                            <div className="col-sm-8">
                                <DatePicker style={{marginBottom:15}}/>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Employee id</th>
                                            <th>Employee Name</th>
                                            <th>Working Shift</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </Modal>
                </Tooltip>

                <Tooltip title="Delete">
                    <Popconfirm
                        placement="top"
                        title="Are you sure delete this department!"
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
}

export default Item;