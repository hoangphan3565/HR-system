import React, { useState } from 'react';
import { Tooltip, Row, Col, Button, Select, Input, Popconfirm,Form,Modal,DatePicker,notification } from "antd";
import { VerticalAlignBottomOutlined, BankOutlined } from "@ant-design/icons";
import Item from './Item';
import './css/styles.css';
const Table = (props) => {
   
    const { Option } = Select;
    const { Search } = Input;
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(8);
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const [pos,setPos]=useState(localStorage.getItem("pos"));
    const [modal, setModal] = useState(false);
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const onFinish = () => {
        setModal(false)
        const args = {
            message: 'Created Successfully',
            description:
                'This department was created in Your System !',
            duration: 1,
        };
        notification.open(args);
    }
    const toggleModal = () => {
        setModal(true);
    }
    const handleCancel = () => {
        setModal(false);
    }
    const pageNumbers = [];

    const department = [{
        deptid: 1,
        deptName: "dfdfdfdfd",
        startDate: "2020-02-02"
    },
    {
        deptid: 1,
        deptName: "dfdfdfdfd",
        startDate: "2020-02-02"
    }, {
        deptid: 1,
        deptName: "dfdfdfdfd",
        startDate: "2020-02-02"
    }
        , {
        deptid: 1,
        deptName: "dfdfdfdfd",
        startDate: "2020-02-02"
    }]
    for (var i = 1; i <= Math.ceil(department.length / perPage); i++) {
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
    const currentDept = department.slice(indexOfFirst, indexOfLast);
    const employee1 = currentDept.map((e, index) => {
        return (
            <Item e={e} key={index} />
        );
    })
    return (
        <div>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col-sm-4">
                                <h5>Department:</h5>
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
                                        <Button icon={<VerticalAlignBottomOutlined />} type="primary" id="exportdept" style={{float:"right",marginLeft:15}}>
                                            Export
                                        </Button>
                                    </Popconfirm>
                                </Tooltip>
                                <Button icon={<BankOutlined />} type="primary" id="addept" onClick={toggleModal} style={{float:"right"}}>
                                    Create
                                </Button>
                                <Modal
                                    visible={modal}
                                    title="Update Department"
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

                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive-md">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Department Id</th>
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