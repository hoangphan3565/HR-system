import React, { useState } from 'react';
import { Tooltip, Row, Col, Button, Select, Input, Popconfirm, Modal, Form, Divider, notification,DatePicker } from "antd";
import { VerticalAlignBottomOutlined, UserAddOutlined } from "@ant-design/icons";
import Item from './Item';
const Table = (props) => {
    const { Option } = Select;
    const { Search } = Input;
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(8);
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
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
    const employee = [{
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        gender: "MALE",
        modifyBy: "1"
    },
    {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        gender: "FEMALE",
        modifyBy: "2"
    }
        , {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        modifyBy: "",
        gender: "FEMALE"
    }, {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        modifyBy: "",
        gender: "MALE"

    },
        , {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        modifyBy: "",
        gender: "MALE"
    }, , {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        modifyBy: "",
        gender: "MALE"

    }
        , {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        modifyBy: ""
    }, , {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        createBy: "1",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        modifyBy: ""
    }
        , , {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        modifyBy: ""
    }
        , , {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        modifyBy: ""
    }
        , , {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        modifyBy: ""
    }
        , , {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        modifyBy: ""
    }
        , , {
        emplid: 1,
        code: "232323232",
        lastName: "John",
        firstName: "Cena",
        startDate: "2020-02-02",
        endDate: "2020-04-06",
        createBy: "1",
        modifyBy: ""
    }
    ]
    const pageNumbers = [];
    for (var i = 1; i <= Math.ceil(employee.length / perPage); i++) {
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
    const currentDept = employee.slice(indexOfFirst, indexOfLast);
    const employee1 = currentDept.map((e, index) => {
        return (
            <Item e={e} key={index} />
        );
    })

    const handleChange = (value) => {
        setHook(value);
    }
    const [hook, setHook] = useState([]);
    return (
        <div>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-4">
                                <h5>Employee:</h5>
                                <Search
                                    placeholder="Input employee name "
                                    onSearch={value => console.log(value)}
                                    style={{ width: 250 }}
                                    size="middle"
                                />
                            </div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <Tooltip placement="topRight" title="Export!">
                                    <Popconfirm title="Do you export to excel!">
                                        <Button
                                            icon={<VerticalAlignBottomOutlined />}
                                            type="primary"
                                            id="export">
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
                                    >Create</Button>
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
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Code</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Gender</th>
                                        <th>CreateBy</th>
                                        <th>UpdateBy</th>
                                        <th>Start Date </th>
                                        <th>End Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employee1
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1">
                                Previous
            </a>
                        </li>
                        {
                            showpage
                        }
                        <Tooltip title="Next :)">
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    Next
              </a>
                            </li>
                        </Tooltip>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Table;