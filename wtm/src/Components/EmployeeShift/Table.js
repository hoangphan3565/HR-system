import React, { useState } from "react";
import Item from './Item';
import { Tooltip, Row, Col, Button, Select, Input, Popconfirm, Pagination } from "antd";
import { VerticalAlignBottomOutlined, SolutionOutlined } from "@ant-design/icons";
import "./css/styles.css";
const Table = (props) => {
  const { Option } = Select;
  const { Search } = Input;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const onShowSizeChange = (current, pageSize) => {
    setPerPage(pageSize);

  }
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const department = [
    {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 2,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 3,
      position: "HR",
      workingShift: 3,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 3,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    },
    {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 2,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    ,
    {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 3,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 3,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }
    , {
      employeeCode: '1111',
      employeeName: "122",
      department: 1,
      position: "HR",
      workingShift: 1,
      startDate: '2020-02-02',
      endDate: '2020-08-02'
    }


  ]
  const pageNumbers = [];
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
  const employee = currentDept.map((e, index) => {
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
      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-sm-4">
              <h5>Department:</h5>
              <Select
                showArrow
                mode="multiple"
                onChange={handleChange}
                placeholder="Select A Department"
                size="middle"
                style={{ width: 250 }}
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>
            </div>
            <div className="col-sm-4">

            </div>
            <div className="col-sm-4">
              <Tooltip placement="topRight" title="Export excel !">
                <Popconfirm title="Do you export to excel!">
                  <Button icon={<VerticalAlignBottomOutlined />} type="primary" id="export" style={{ marginLeft: 15, float: "right" }}>
                    Export
              </Button>
                </Popconfirm>
              </Tooltip>
              <Tooltip>
                <Button id="btncreate" icon={<SolutionOutlined />} type="primary" style={{ float: "right" }}>Create</Button>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row align-items-center" style={{ margin: 15 }}>
            <div className="col-sm-4">
              <Search
                placeholder="Input employee name "
                onSearch={value => console.log(value)}
                style={{ width: 250 }}
                size="middle"
              />
            </div>
            <div className="col-sm-4">
              <Select
                showArrow
                mode="multiple"
                onChange={handleChange}
                placeholder="Select A Position"
                size="middle"
                style={{ width: 250, marginLeft: 10, marginRight: 10 }}
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>
            </div>
            <div className="col-sm-4">
              <Select
                showArrow
                mode="multiple"
                onChange={handleChange}
                placeholder="Select A Shift"
                size="middle"
                style={{ width: 250 }}
                id="shiftselect"
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>
            </div>
          </div>
          <div className="table-responsive-md">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Code</th>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Working Shift</th>
                  <th>Start Date </th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  employee
                }
              </tbody>
            </table>
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={onChange}
              total={500}
              showQuickJumper
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Table;
