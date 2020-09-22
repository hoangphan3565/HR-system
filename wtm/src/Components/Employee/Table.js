import React, { useState, useEffect, useRef } from 'react';
import { Tooltip, Button, Select, Input, Popconfirm, Modal, Form, notification, DatePicker, Pagination, Empty, BackTop } from "antd";
import { VerticalAlignBottomOutlined, UserAddOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import Item from './Item';
import EmployeeServices from '../../Services/EmployeeServices';
import DepartmentService from '../../Services/DepartmentService';
import PositionService from '../../Services/PositionServices';
import moment from 'moment';
const Table = (props) => {

    const search = useRef();
    const code = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const position = useRef();
    const department = useRef();
    const startDate = useRef();
    const timeCheckCode = useRef();

    const [searching, setSearching] = useState("");
    const [posing, setPosing] = useState("");
    const [depting, setDepting] = useState("");

    const [employees, setEmployees] = useState([]);
    const [temp, setTemp] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [dept, setDept] = useState([]);
    const [pos, setPos] = useState([]);
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const date1 = new Date();
    const year = date1.toISOString();
    const a = year.slice(0, 10);
    const [start, setStartDate] = useState(`${a}`);
    const [getDept, setGetDept] = useState();
    const [getPos, setGetPos] = useState();
    const [link, setLink] = useState("");
    const transmiss = (a) => {
        setLink(a);
    }
    //--------------Lấy dữ liệu dept với pos
    useEffect(() => {
        DepartmentService.list().then(res => {
            setDept(res.data);
        })
        PositionService.list().then(res => {
            setPos(res.data);
        })
        EmployeeServices.list().then(res=>{
            setTemp(res.data)
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
    useEffect(() => {
        if (depting === "" && posing == "" && searching == "") {
            EmployeeServices.list(searching).then(res => { setEmployees(res.data); });
        }
        if (depting && posing && searching === "") {
            EmployeeServices.findByDeptAndPos(depting, posing).then(res => { setEmployees(res.data) })
        }
        if(depting==="" && posing && searching===""){
            EmployeeServices.findByPos(posing).then(res => { setEmployees(res.data) })  
        }
    }, [searching,posing,depting,link]);
    useEffect(()=>{
        EmployeeServices.list(link).then(res => { setEmployees(res.data); });
    },[link])
    useEffect(() => {
        if (posing && depting) {
            EmployeeServices.findByCodeAndDeptAndPos(searching, depting, posing).then(res => {
                setEmployees(res.data)
            })
        }
        if (posing == "" && depting) {
            EmployeeServices.findByCodeAndDept(searching, depting).then(res => {
                setEmployees(res.data);
            })
        }
        if (posing && depting=="") {
            EmployeeServices.findByCodeAndPos(searching,posing).then(res => {
                setEmployees(res.data);
            })
        }
        if (posing === "" && depting === "" && search) {
            const test1 = [];
            for (var i = 0; i < temp.length; i++) {
                var fla = 0;
                if (searching === temp[i].employeeCode) {
                    EmployeeServices.findByCode(searching).then(res => { test1.push(res.data); setEmployees(test1); });
                    fla = 1;
                    break;
                }
            }
            if (fla === 0) {
                EmployeeServices.findByFname(searching).then(res => { setEmployees(res.data) });
            }
        }
    }, [searching])
    //chọn dept nhận pos
    useEffect(() => {
        if (posing && searching == "") {
            EmployeeServices.findByDeptAndPos(depting, posing).then(res => { setEmployees(res.data) })
        }
        if (posing && searching !== "") {
            EmployeeServices.findByCodeAndDeptAndPos(searching, depting, posing).then(res => {
                setEmployees(res.data)
            })
        }
        if (posing === "" && searching !== "") {
            EmployeeServices.findByCodeAndDept(searching, depting).then(res => {
                setEmployees(res.data)
            })
        }
        if (posing === "" && searching === "") {
            EmployeeServices.findByDept(depting).then(res => { setEmployees(res.data) })
        }
        if (posing && depting === "") {
            EmployeeServices.findByPos(posing).then(res => { setEmployees(res.data) })
        }
    }, [depting])
    //chọn pos nhân dept
    useEffect(() => {
        if (depting && searching == "") {
            EmployeeServices.findByDeptAndPos(depting, posing).then(res => { setEmployees(res.data) })
        }
        if (depting && searching !== "") {
            EmployeeServices.findByCodeAndDeptAndPos(searching, depting, posing).then(res => { setEmployees(res.data) })
        }
        if (depting === "" && search !== "") {
            EmployeeServices.findByCodeAndPos(searching, posing).then(res => { setEmployees(res.data) })
        }
        if (depting === "" && searching === "") {
            EmployeeServices.findByPos(posing).then(res => { setEmployees(res.data) })
        }
    }, [posing])

    const { Option } = Select;
    const { Search } = Input;
    const onShowSizeChange = (current, pageSize) => {
        setPerPage(pageSize);

    }
    const onChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const currentEmployees = employees.slice(indexOfFirst, indexOfLast);

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
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const [addModal, setAddModal] = useState(false);
    const addShowModal = () => {
        addModal === false ? setAddModal(true) : setAddModal(false);
    }
    const handleCancel = () => {
        setAddModal(false);
    }
    const onFinish = () => {
        const employee = {
            "employeeCode": code.current.props.value,
            "timeCheckCode": parseInt(timeCheckCode.current.props.value),
            "firstName": firstName.current.props.value,
            "lastName": lastName.current.props.value,
            "startdate": startDate.current.props.value._i,
            "createby":1,
            "isdeleted":false
        }
        const args = {
            message: 'Created Successfully',
            description:
                'An new employee was added in Your System !',
            duration: 1,
        };
        EmployeeServices.add(department.current.props.value,position.current.props.value,employee).then(res=>{
            setAddModal(false);
            setLink("1");
            setLink("")
        },notification.success(args))

    }
    const getEmployeeByCodeAndFname = (a) => {
        setSearching(a);
    }
    useEffect(() => {
        EmployeeServices.list(link).then(res => {
            setTemp(res.data);
        })
    }, []);
    const handleDatePickerChange = (date, dateString) => {
        setStartDate(dateString);
    }
    const getDepartment = (a) => {
        setDepting(a);
    }
    const getOption = (a) => {
        setPosing(a);
    }

    const employee = currentEmployees.map((e, index) => {
        return (
            <Item e={e} test={transmiss} />
        );
    });

    return (
        <div>
            <div className="container">
                <h5>Employees</h5>
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center" >
                            <div className="col-md-3">
                                <Search
                                    placeholder="Search..."
                                    onSearch={value => getEmployeeByCodeAndFname(value)}
                                    style={{ width: 250 }}
                                    size="middle"
                                    allowClear
                                    ref={search}
                                />
                            </div>
                            <div className="col-md-6">
                                <Select
                                    showSearch
                                    style={{ width: 250 }}
                                    placeholder="Select a department"
                                    onChange={getDepartment}>
                                    <Option value={""}>All</Option>
                                    {optionsDept}
                                </Select>
                                <Select
                                    showSearch
                                    style={{ width: 250, float: "right" }}
                                    placeholder="Select a position"
                                    onChange={getOption}>
                                    <Option value={""}>All</Option>
                                    {optionsPos}
                                </Select>
                            </div>
                            <div className="col-md-3">
                                <Tooltip placement="topRight" title="Export!">
                                    <Popconfirm title="Do you export to excel!">
                                        <Button
                                            icon={<VerticalAlignBottomOutlined />}
                                            type="primary"
                                            id="export"
                                            style={{ float: "right", marginLeft: 15 }}>
                                            Export
                                        </Button>
                                    </Popconfirm>
                                </Tooltip>
                                <Tooltip placement="topRight" title="Add!">
                                    <Button
                                        id="btnaddempl"
                                        icon={<UserAddOutlined />}
                                        type="primary"
                                        onClick={addShowModal}
                                        style={{ float: "right" }}>Create</Button>
                                </Tooltip>
                                <Modal
                                    title="Create Employee"
                                    visible={addModal}
                                    onCancel={handleCancel}
                                    footer={[
                                        <Button key="back" onClick={handleCancel}>
                                            Cancel
                             </Button>,
                                        <Button key="submit" type="primary" htmlType="submit" onClick={onFinish} style={{ float: "right" }}>
                                            Create
                                 </Button>

                                    ]}
                                >
                                    <Form {...layout} onFinish={onFinish}>
                                        <Form.Item
                                            label="Code"
                                            name="code"
                                            rules={[{ required: true }]}
                                            hasFeedback>
                                            <Input size="middle" ref={code} />
                                        </Form.Item>
                                        <Form.Item
                                            label="TimeCheck Code"
                                            name="timeCheckCode"
                                            rules={[{ required: true }]}
                                            hasFeedback>
                                            <Input size="middle" ref={timeCheckCode} />
                                        </Form.Item>
                                        <Form.Item
                                            label="First Name"
                                            name="firstName"
                                            rules={[{ required: true }]}
                                            hasFeedback>
                                            <Input size="middle" ref={firstName} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Last Name"
                                            name="lastName"
                                            rules={[{ required: true }]}
                                            hasFeedback>
                                            <Input size="middle" ref={lastName} />
                                        </Form.Item>
                                        <Form.Item label="Department" name="department">
                                            <Select ref={department}>
                                                {optionsDept}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="Position" name="position">
                                            <Select ref={position}>
                                                {optionsPos}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item label="Start Date">
                                            <DatePicker
                                                value={moment(`${start}`, "YYYY-MM-DD")}
                                                style={{ width: 354 }}
                                                onChange={(date, dateString) => handleDatePickerChange(date, dateString)}
                                                ref={startDate}
                                            />
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive-md">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Employee Code</th>
                                        <th>Time Check Code</th>
                                        <th>Full Name</th>
                                        <th>Position</th>
                                        <th>Department</th>
                                        <th>Start Date </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employee.length!==0?employee:<Empty />}
                                </tbody>
                            </table>
                            <Pagination
                                showSizeChanger
                                current={currentPage}
                                onShowSizeChange={onShowSizeChange}
                                onChange={onChange}
                                total={employees.length}
                                showQuickJumper
                            />
                        </div>
                    </div>
                </div>
                <BackTop>
                    <Button shape="circle" style={{ backgroundColor: "rgba(0,0,0,0.85)", color: "white", opacity: 0.4 }} icon={<VerticalAlignTopOutlined />}></Button>
                </BackTop>
            </div>
        </div>
    );
}

export default Table;