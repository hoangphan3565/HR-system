import React from 'react';
import { Tag, Tooltip, Button, Modal, Form, Input, Select, DatePicker, notification, Popconfirm } from 'antd';
import { SolutionOutlined, DeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useState, useEffect,useRef } from 'react';
import EmployeeServices from '../../Services/EmployeeServices';
import DepartmentService from '../../Services/DepartmentService';
import PositionService from '../../Services/PositionServices';
import axios from 'axios';
import moment from 'moment';
const Item = (props) => {
    const [form] = Form.useForm();

    const firstName = useRef();
    const lastName = useRef();
    const position = useRef();
    const department = useRef();
    const startDate1 = useRef();
    const [fla,setFla]=useState();
    const [visible, setVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [startDate,setStartDate]=useState();
    const [dept, setDept] = useState([]);
    const [pos, setPos] = useState([]);
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const { Option } = Select;
    const [updateModal, setUpdateModal] = useState(false);
    useEffect(() => {
        DepartmentService.list().then(res => {
            setDept(res.data);
        })
        PositionService.list().then(res => {
            setPos(res.data);
        })
    },[])
    const deptOptions = [];
    for (let i = 0; i < dept.length; i++) {
        deptOptions.push(dept[i].dep_ID)
    }
    const posOptions = [];
    for (let i = 0; i < pos.length; i++) {
        posOptions.push(pos[i].pos_ID)
    }
    const onFinish = () => {
        const employee={
            "firstName":firstName.current.props.value,
            "lastName":lastName.current.props.value,
            "startdate":startDate1.current.props.value._i
        }
        const args = {
            message: 'Created Successfully',
            description:
                'An new employee was added in Your System !',
            duration: 1,
            icon:<UserSwitchOutlined />
        };
        EmployeeServices.update(props.e.emp_ID,department.current.props.value,position.current.props.value,employee).then(res=>{
            props.test("1");
            props.test("");
            setVisible(false);
            
       },notification.open(args))
    }
    const onDelete = () => {

        console.log(props.e.emp_ID);
        axios.delete(`http://localhost:8080/api/employees/${props.e.emp_ID}/uid/1`).then(res => {
            props.test("1");
            props.test("");
        })

        const args = {
            message: 'Deleted Successfully',
            description:
                'A new employee was deleted in Your System !',
            duration: 1,
            icon: <DeleteOutlined />

        };
        notification.open(args);
    }
    const updateShowModal = () => {
        updateModal === false ? setUpdateModal(true) : setUpdateModal(false);
    }

    const toggleVisible = () => {
        setVisible(true);
        setStartDate(props.e.startdate)
    }
    const handleCancel = () => {
        setVisible(false);
    }
    const color = ["magenta", "purple", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue"];

    const makecolor = (a) => {
        for (let i = 0; i < color.length; i++) {
            if (a === "Department 0" + i) {
                return (
                    <Tag color={color[i]}>D{i}</Tag>
                )
            }
        }
    }
    const optionsDept = deptOptions.map((e) => {
        return (
            <Option value={e}>Department 0{e}</Option>
        );
    })

    const optionsPos = posOptions.map((e) => {
        return (
            <Option value={e}>{e === 2 ? "Nhân viên văn phòng" : "Công nhân"}</Option>
        );
    })  
    useEffect(() => {
        form.setFieldsValue({
            code: props.e.employeeCode,
            timeCheckCode: props.e.timeCheckCode,
            firstName: props.e.firstName,
            lastName: props.e.lastName,
            department: props.e.department.dep_ID,
            position: props.e.position.pos_ID,
            //tartDate:props.e.startdate
        });
    },)
 
    const handleDatePickerChange = (date, dateString) => {
        setStartDate(dateString);
    }
    return (
        <tr key={props.e.emp_ID}>
            <td>{props.e.emp_ID}</td>
            <td>{props.e.employeeCode}</td>
            <td>{props.e.timeCheckCode}</td>
            <td>{props.e.fullName} </td>
            <td>{props.e.position.pos_ID === 2 ? <Tag color={"magenta"}>NVVP</Tag> : <Tag color="green">CN</Tag>}</td>
            <td>{makecolor(props.e.department.departmentName)}</td>
            <td>{props.e.startdate}</td>
            <td>
                <Tooltip title="Update!">
                    <Button
                        shape="circle"
                        icon={<SolutionOutlined />}
                        onClick={toggleVisible}
                        style={{ backgroundColor: "rgb(107, 189, 243)" }}
                    />
                    <Modal
                        visible={visible}
                        title="Employee Information"
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Cancel
                          </Button>,
                            <Button key="submit" type="primary" onClick={onFinish}>
                                Update
                          </Button>
                        ]}
                    >
                        <Form {...layout} form={form} name="control-hooks">
                            <Form.Item
                                label="Code"
                                name="code"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input size="middle" readOnly/>
                            </Form.Item>
                            <Form.Item
                                label="TimeCheck Code"
                                name="timeCheckCode"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input size="middle" readOnly/>
                            </Form.Item>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input size="middle" ref={firstName}/>
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true }]}
                                hasFeedback>
                                <Input size="middle" ref={lastName}/>
                            </Form.Item>

                            <Form.Item label="Department" name="department">
                                <Select ref={department}>
                                    {
                                        optionsDept
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item label="Postion" name="position">
                                <Select ref={position}>
                                    {
                                        optionsPos
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item label="Start Date">
                                <DatePicker
                               
                                  value={moment(startDate, "YYYY-MM-DD")}
                                  style={{ width: 354 }}
                                  onChange={(date, dateString) => handleDatePickerChange(date, dateString)}
                                  ref={startDate1}
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
                            style={{ backgroundColor: "rgb(236, 118, 82)" }}
                        />
                    </Popconfirm>
                </Tooltip>
            </td>
        </tr>
    );
}

export default Item;