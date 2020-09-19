import React, { useState, useEffect, useRef } from 'react';
import { Tooltip, Button, Select, Input, Popconfirm, Modal, Form,notification, DatePicker, Pagination,Empty } from "antd";
import { VerticalAlignBottomOutlined, UserAddOutlined } from "@ant-design/icons";
import Item from './Item';
import EmployeeServices from '../../Services/EmployeeServices';
const Table = (props) => {
    const [link, setLink] = useState("");
    const search = useRef();
    const [employees, setEmployees] = useState([]);
    const [temp, setTemp] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;

    console.log(temp);
    useEffect(() => {
        const test1 = [];
        if (link !== "") {
            var fla=0;
            for (var i = 0; i < temp.length; i++) {
                //console.log(temp[i].emp_ID);
                if (Number(link) === temp[i].emp_ID) {
                    EmployeeServices.list(link).then(res => { test1.push(res.data); setEmployees(test1); });
                    fla=1;
                    break;
                }
            }
            if(fla==0){
                setEmployees([]);
            }       
        }
        else {
            EmployeeServices.list(link).then(res => { setEmployees(res.data); });
        }

    }, [link])
    console.log(employees);
    const { Option } = Select;
    const { Search } = Input;
    const onShowSizeChange = (current, pageSize) => {
        setPerPage(pageSize);

    }
    const onChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const currentEmployees = employees.slice(indexOfFirst, indexOfLast);
    const employee = currentEmployees.map((e, index) => {
        return(
            <Item e={e}/>
        );
    });
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
        setAddModal(false);
        const args = {
            message: 'Created Successfully',
            description:
                'This employee was updated in Your System !',
            duration: 1,
        };
        notification.open(args);
    }
    const test = (a) => {
        setLink(a);
    }
    useEffect(() => {
        EmployeeServices.list(link).then(res => {
            setTemp(res.data);
        })
    }, []);
    return (
        <div>
            <div className="container">
                <div className="card" style={{ width: 1190 }}>
                    <div className="card-header">
                        <div className="row align-items-center" >
                            <div className="col-md-4">
                                <h5>Employee:</h5>
                                <Search
                                    placeholder="Input employee name "
                                    onSearch={value => test(value)}
                                    style={{ width: 250 }}
                                    size="middle"
                                    allowClear
                                    ref={search}
                                />
                            </div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
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
                                        <Button key="submit" type="primary" onClick={onFinish}>
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
                                        <Form.Item label="Position" name="position">
                                            <Select >
                                                <Option value="MALE">Male</Option>
                                                <Option value="FEMALE">Female</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="Department" name="department">
                                            <Select >
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
                                        <th>End Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employee.length!==0?employee:<Empty />}
                                </tbody>
                            </table>
                            <Pagination
                                showSizeChanger
                                onShowSizeChange={onShowSizeChange}
                                onChange={onChange}
                                total={employees.length}
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