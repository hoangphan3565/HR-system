import React, { useState } from 'react';
import { Tooltip, Radio, Button, Select, Input, Popconfirm, DatePicker } from "antd";
import { VerticalAlignBottomOutlined, UserAddOutlined } from "@ant-design/icons";
import './css/styles.css';
import Item from './Item';
const Table = (props) => {
    const { Option } = Select;
    const { Search } = Input;
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(8);
    const indexOfLast = currentPage * perPage;
    const indexOfFirst = indexOfLast - perPage;
    const timekeepings = [
        {
            id: 1,
            fullName: "Criss Phạm",
            department: 1,
            workingShift: 1,
            in: "06:00",
            out: "11:59"
        },
        {
            id: 2,
            fullName: "Criss Phạm",
            department: 2,
            workingShift: 2,
            in: "12:00",
            out: "17:59"
        },
        {
            id: 3,
            fullName: "Criss Phạm",
            department: 2,
            workingShift: 1,
            in: "",
            out: ""
        },
        {
            id: 4,
            fullName: "Criss Phạm",
            department: 3,
            workingShift: 2,
            in: "12:00",
            out: "17:59"
        }, {
            id: 5,
            fullName: "Criss Phạm",
            department: 2,
            workingShift: 3,
            in: "18:00",
            out: "23:59"
        }
    ]
    const pageNumbers = [];
    for (var i = 1; i <= Math.ceil(timekeepings.length / perPage); i++) {
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
    const currentDept = timekeepings.slice(indexOfFirst, indexOfLast);
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
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-8" style={{ display: "inline", marginBottom: "2%" }}>
                    <h4>TimeKeeping</h4>
                    <DatePicker size="middle" style={{ width: 350 }} />
                </div>
                <div className="col-md-4">

                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-4">
                            <h5>Department</h5>
                            <Select
                                showArrow
                                mode="multiple"
                                onChange={handleChange}
                                placeholder="Select A Department"
                                size="middle"
                                style={{ width: 325 }}
                            >
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                            </Select>
                        </div>
                        <div className="col-md-4">
                            <Search
                                placeholder="Search..."
                                onSearch={value => console.log(value)}
                                style={{ width: 325 ,marginTop:"10%"}}
                                size="middle"
                            />
                        </div>
                        <div className="col-md-4">
                            <Tooltip placement="topRight" title="Export!">
                                <Popconfirm title="Do you export to excel!" placement="bottomLeft">
                                    <Button
                                        icon={<VerticalAlignBottomOutlined />}
                                        type="primary"
                                        id="exporttime"
                                        style={{float:"right"}}>
                                        Export
                                </Button>
                                </Popconfirm>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row" style={{ marginBottom: "2%" }}>
                        <div className="col-md-2"></div>
                        <div className="col-md-8" style={{ textAlign: "center" }}>
                            <Radio.Group>
                                <Radio value={1} style={{ color: "blue" }}>All</Radio>
                                <Radio value={2} style={{ color: "green" }}>Valid</Radio>
                                <Radio value={3} style={{ color: "purple" }}>Empty</Radio>
                                <Radio value={4} style={{ color: "orange" }}>Missing</Radio>
                            </Radio.Group>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="table-responsive-md">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Employee ID</th>
                                    <th>Full Name</th>
                                    <th>Department</th>
                                    <th>Working Shift</th>
                                    <th>Working Hour</th>
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
    );
}

export default Table;