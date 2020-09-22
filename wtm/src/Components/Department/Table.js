import React, { useState } from 'react';
import { Tooltip, Row, Col, Button, Select, Input, Popconfirm, Form, Modal, DatePicker, notification, Pagination } from "antd";
import { VerticalAlignBottomOutlined, UsergroupAddOutlined, UserAddOutlined } from "@ant-design/icons";
import Item from './Item';
import './css/styles.css';
import { useEffect, useRef } from 'react';
import DepartmentService from '../../Services/DepartmentService';
import moment from 'moment';

const Table = (props) => {
    const handleDatePickerChange = (date, dateString) => {
        setStartDate(dateString);
    }
    const [form] = Form.useForm();
    const { Search } = Input;
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const [modal, setModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const deptName = useRef("");
    const startDate = useRef("");
    const date1 = new Date();
    const year = date1.toISOString();
    const a = year.slice(0, 10);
    const [start, setStartDate] = useState(`${a}`);
    const departmentName = useRef();
    const [fla, setFla] = useState();
    const transmiss = (a) => {
        setFla(a);
    }
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const onFinish = () => {
        if (startDate.current.props.value._i && departmentName.current.props.value) {
            const args = {
                message: 'Created Successfully',
                description:
                    'An new department was created in Your System !'
            };
            const department = {
                "departmentName": departmentName.current.props.value,
                "startDate": startDate.current.props.value._i,
                "isdeleted": false
            };
            DepartmentService.add(department).then(res => { setModal(false); setFla(1); setFla("") }, notification.success(args));
        }

        else {
            const args = {
                message: 'Created Unsucessfully',
                description:
                    'Pleaset input informations fully before create!',
            };
            notification.error(args);
        }
    }
    const toggleModal = () => {
        setModal(true);
    }
    const handleCancel = () => {
        setModal(false);
    }
    const pageNumbers = [];
    useEffect(() => {
        DepartmentService.list().then(res => {
            setDepartments(res.data);
        })
    },[fla])
    for (var i = 1; i <= Math.ceil(departments.length / perPage); i++) {
        pageNumbers.push(i);
    }
    const current = (a) => {
        setCurrentPage(a);
    };
    const showpage = pageNumbers.map((page, index) => {
        return (
            <Tooltip title={index + 1} key={index}>
                <li className="page-item">
                    <a className="page-link" onClick={() => current(index + 1)}>
                        {page}
                    </a>
                </li>
            </Tooltip>
        );
    });
    const currentDept = departments.slice(indexOfFirst, indexOfLast);
    const employee1 = currentDept.map((e, index) => {
        return (
            <Item e={e} key={index} test={transmiss} />
        );
    })
    const onChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const onShowSizeChange = (current, pageSize) => {
        setPerPage(pageSize);

    }
    return (
        <div>
            <div className="container">
                <h5>Department:</h5>
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col-sm-4">
                                <Search
                                    placeholder="Input department name"
                                    onSearch={value => console.log(value)}
                                    style={{ width: 250 }}
                                    size="middle"
                                />
                            </div>
                            <div className="col-sm-4">

                            </div>
                            <div className="col-sm-4">
                                <Tooltip placement="topRight" title="Export!">
                                    <Popconfirm title="Do you export to excel!">
                                        <Button icon={<VerticalAlignBottomOutlined />} type="primary" id="exportdept" style={{ float: "right", marginLeft: 15 }}>
                                            Export
                                        </Button>
                                    </Popconfirm>
                                </Tooltip>
                                <Tooltip placement="topRight" title="Add!">
                                    <Button
                                        id="btnaddempl"
                                        icon={<UserAddOutlined />}
                                        type="primary"
                                        onClick={toggleModal}
                                        style={{ float: "right" }}>Create</Button>
                                </Tooltip>
                                <Modal
                                    title="Create Employee"
                                    visible={modal}
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
                                    <Form {...layout} onFinish={onFinish} form={form} name="control-hooks">
                                        <Form.Item
                                            label="Department"
                                            name="dept"
                                            rules={[{ required: true }]}
                                            hasFeedback>
                                            <Input size="middle" ref={departmentName} />
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
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Department ID</th>
                                        <th>Department Name</th>
                                        <th>Start Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employee1
                                    }
                                </tbody>
                            </table>
                            <Pagination
                                showSizeChanger
                                current={currentPage}
                                onShowSizeChange={onShowSizeChange}
                                onChange={onChange}
                                total={departments.length}
                                showQuickJumper
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Table;