import React from 'react';
import { Tag, Tooltip, Button, Modal, Form, Input, Select,DatePicker } from 'antd';
import { UserAddOutlined, FolderOpenOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
const Item = (props) => {

    const [visible, setVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const { Option } = Select;

    const makeColor = (a) => {
        if (a === 1) {
            return (
                <Tag color="orange">
                    CA1
                </Tag>
            );
        }
        if (a === 2) {
            return (
                <Tag color="geekblue">
                    CA2
                </Tag>
            );
        }
        if (a === 3) {
            return (
                <Tag color="lime">
                    CA3
                </Tag>
            );
        }
    }
    const toggleVisible = () => {
        setVisible(true);
    }
    const toggleAddVisible = () => {
        setAddVisible(    );
    }
    const handleCancel = () => {
        setVisible(false);
    }
    const handleAddCancel = () => {
        setAddVisible(false);
    }
    return (
        <tr key={props.e.id}>
            <td>{props.e.key}</td>
            <td>{props.e.employeeCode}</td>
            <td>{props.e.employeeName}</td>
            <td>
                {props.e.department}
            </td>
            <td>{props.e.position}</td>
            <td>
                {
                    makeColor(props.e.workingShift)
                }
            </td>

            <td>{props.e.startDate}</td>
            <td>{props.e.endDate}</td>
            <td>
                <Tooltip title="His/her history">
                    <Button
                        className="update"
                        shape="circle"
                        icon={<FolderOpenOutlined />}
                        onClick={toggleVisible}
                        style={{backgroundColor:"orange"}}
                    />
                    <Modal
                        title="Working Shift History"
                        visible={visible}
                        cancelText="Close"
                        onCancel={handleCancel} width={1000}
                    >
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Shift Code</th>
                                    <th>Shift Name</th>
                                    <th>Department</th>
                                    <th>Start Date </th>
                                    <th>End Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                        </table>
                    </Modal>
                </Tooltip>

                <Tooltip title="Add!">
                    <Button
                        className="delete"
                        shape="circle"
                        icon={<UserAddOutlined />}
                        onClick={toggleAddVisible} 
                        style={{backgroundColor:"rgb(107, 189, 243)"}}/>
                    <Modal
                        visible={addVisible}
                        title="Add Working Shift"
                        onCancel={handleAddCancel}
                        onOk={toggleAddVisible}
                    >
                        <Form {...layout}>
                            <Form.Item
                                label="Employee Code"
                                name="employeeCode"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input readOnly size="small"/>
                            </Form.Item>
                            <Form.Item
                                label="Employee Name"
                                name="employeeName"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input readOnly size="small" />
                            </Form.Item>
                            <Form.Item label="Working Shift" name="workingShift">
                                <Select
                                    showArrow
                                    mode="multiple"
                                    //onChange={handleChange}
                                    placeholder="Select A Position"
                                    size="small"
                                    style={{ width: 350 }}
                                >
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Start Date" name="startDate">
                                <DatePicker style={{width:350}} size="small" >

                                </DatePicker>
                            </Form.Item>

                            <Form.Item label="End Date" name="startDate">
                                <DatePicker style={{width:350}} size="small">                                    
                                </DatePicker>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Tooltip>
                <Tooltip placement="topRight" title="Delete!" ><Button shape="circle" icon={<DeleteOutlined />} style={{backgroundColor:"rgb(236, 118, 82)"}} />  </Tooltip>
            </td>
        </tr>
    );
}
export default Item;