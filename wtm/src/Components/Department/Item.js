import React,{useRef,useEffect} from 'react';
import {Tooltip, Button, Modal, Form, Input, Select, DatePicker, Popconfirm, Statistic, Card,notification } from 'antd';
import { EditOutlined, UsergroupDeleteOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import DepartmentService from '../../Services/DepartmentService';
const Item = (props) => {
    const { Search } = Input;
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false);
    const [startDate,setStartDate]=useState();
    const departmentName=useRef();
    const startDate1 = useRef();
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
        setStartDate(props.e.startDate)
    }
    const handleEmplCancel = () => {
        setVisible(false);
    }
    const handleUpdateCancel = () => {
        setUpdateVisible(false);
    }
    const onFinish = () => {
       const department={
           "departmentName":departmentName.current.props.value,
           "startDate":startDate1.current.props.value._i
       }
        const args = {
            message: 'Updated Successfully',
            description:
                'This department was updated in Your System !',
            duration: 1,
        };
        DepartmentService.update(props.e.dep_ID,1,department).then(res=>{ setUpdateVisible(false);
            props.test("");
            props.test(1)},notification.success(args));
    }
    const handleDatePickerChange = (date, dateString) => {
        setStartDate(dateString);
    }
    useEffect(() => {
        form.setFieldsValue({
           deptName:props.e.departmentName
        });
    },)
    const onDelete=()=>{
        const args = {
            message: 'Deleted Successfully',
            description:
                'This department was deleted in Your System !',
            duration: 1,
        };
        DepartmentService.clear(props.e.dep_ID,1).then(res=>{
            props.test(1);props.test("")
        },notification.success(args))
    };
    return (
        <tr key={props.e.id}>
            <td>{props.e.dep_ID}</td>
            <td>{props.e.departmentName}</td>
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
                        <Form {...layout} form={form} name="control-hooks">
                            <Form.Item
                                label="Name"
                                name="deptName"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input size="middle" ref={departmentName}/>
                            </Form.Item>
                            <Form.Item
                                label="StartDate"
                                name="startDate"
                                rules={[{ required: true }]}
                                hasFeedback>
                                    {
                                        console.log(startDate)
                                    }
                                <DatePicker 
                                size="middle" 
                                style={{ width: 354 }}
                                value={moment(startDate, "YYYY-MM-DD")}
                                style={{ width: 354 }}
                                onChange={(date, dateString) => handleDatePickerChange(date, dateString)}
                                ref={startDate1}
                                 />
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
                        width={1200}
                        footer={[
                            <Button key="back" onClick={handleEmplCancel}>
                                Cancel
                          </Button>,
                        ]}
                    >
                        <div className="row">
                            <div className="col-sm-2">
                                <Card size="small">
                                    <Statistic title="Active Employees" value={12000} prefix={<UserOutlined />} valueStyle={{ color: '#3f8600' }} />
                                </Card>
                                <Card style={{marginTop:15}} size="small">
                                    <Statistic title="Absent Employees" value={3} prefix={<UserOutlined />} valueStyle={{ color: '#cf1322' }} />
                                </Card>

                            </div>
                            <div className="col-sm-10">
                                <DatePicker style={{marginBottom:15,width:250}}/>
                                <Search
                                    placeholder="Input department name"
                                    onSearch={value => console.log(value)}
                                    style={{ width: 250,marginLeft:15 }}
                                    size="middle"
                                />
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
}

export default Item;