import React, { useState, useEffect, useRef } from "react";
import Item from "./Item";
import {
  Tooltip,
  notification,
  Button,
  Select,
  Input,
  Form,
  Popconfirm,
  DatePicker,
  Pagination,
  Modal,
} from "antd";
import {
  VerticalAlignBottomOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import "./css/styles.css";
import EmployeeShiftService from "../../Services/EmployeeShiftService";
import DepartmentService from "../../Services/DepartmentService";
import EmployeeServices from "../../Services/EmployeeServices";
import ShiftService from "../../Services/ShiftService";
import UserActivityService from '../../Services/UserActivityService';
import moment from "moment";
const Table = (props) => {
  const { Option } = Select;
  const { Search } = Input;
  const search = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [empShifs, setEmpShifts] = useState([]);
  const [searching, setSearching] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [link, setLink] = useState("");
  const [dept, setDept] = useState([]);
  const [dept1, setDept1] = useState([]);
  const [deptID, setDeptID] = useState("");
  const [emp, setEmp] = useState([]);
  const [shift, setShift] = useState([]);
  const [shift1, setShift1] = useState([]);
  const [emp1, setEmp1] = useState([]);
  const [message, setMessage] = useState("");
  const [temp, setTemp] = useState([]);
  const empname = useRef();
  const [start, setStartDate] = useState("2020-09-28");
  const [end, setStartEnd] = useState("2020-09-28");
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  const onShowSizeChange = (current, pageSize) => {
    setPerPage(pageSize);
  };
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {

      EmployeeShiftService.list().then((res) => {
        setEmpShifts(res.data);
      });
  },[]);

  useEffect(() => {
    if (searching !== "" && deptID==="") {
      console.log(searching);
      EmployeeShiftService.findCode(searching).then((res) => {
        setEmpShifts(res.data);
      });
    }if(deptID!=="" &&searching===""){
      EmployeeShiftService.findDept(deptID).then((res) => {
        setEmpShifts(res.data);
      });
    }
  }, [searching,deptID]);

  useEffect(() => {
    EmployeeShiftService.list().then((res) => {
      setEmpShifts(res.data);
    });
    DepartmentService.list().then((res) => {
      setDept(res.data);
    });
    EmployeeServices.getall().then((res) => {
      setEmp(res.data);
    });
    ShiftService.list().then((res) => {
      setShift(res.data);
    });
  }, []);

  const refresh = () => {
    setMessage("");
  };
  const department = [];
  const pageNumbers = [];
  for (var i = 1; i <= Math.ceil(department.length / perPage); i++) {
    pageNumbers.push(i);
  }
  const current = (a) => {
    setCurrentPage(a);
  };
  //modal
  const handleCancel = () => {
    setAddModal(false);
  };
  const [addModal, setAddModal] = useState(false);
  const toggleModal = () => {
    addModal === false ? setAddModal(true) : setAddModal(false);
  };
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  //add
  const getEmp = (a) => {
    EmployeeServices.list(a).then((res) => {
      setEmp1(res.data);
    });
  };
  const getShift = (a) => {
    ShiftService.get(a).then((res) => {
      setShift1(res.data);
    });
  };
  const getDept1 = (a) => {
    EmployeeShiftService.findDept(a).then((res) => {
      setDept1(res.data);
    });
  };
  const getDeptID = (a) => {
    setDeptID(a);
  };

  const onChangeStart = (date, dateString) => {
    setStartDate(dateString);
  };
  const onChangeEnd = (date, dateString) => {
    setStartEnd(dateString);
  };
  const [id, setId] = useState("");
  useEffect(() => {
    setId(localStorage.getItem("id"))
  },[])
  const onFinish = () => {
    const empshift = {
      employee: emp1,
      shift: shift1,
      startdate: start,
      enddate: end,
    };
    const actvity = {
      "usr_ID": id,
      "activityName": `Created new employeeshift with name ${empshift.employee}`,
      "isdeleted": false,
    };
    const args = {
      message: "Created Successfully",
      description: "An new employee shift was added in Your System !",
      duration: 1,
    };
    EmployeeShiftService.add(empshift).then((res) => {
      if (res.status === 200) {
        UserActivityService.add(actvity).then();
        setAddModal(false);
        setLink("1");
        setLink("");
        notification.success(args);
      }
    });
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
  const callback = (a) => {
    setDeptID(a);
  };
  const currentDept = empShifs.slice(indexOfFirst, indexOfLast);
  const employeeshift = currentDept.map((e, index) => {
    return <Item e={e} key={index} test={callback} />;
  });

  const deptOptions = [];
  for (let i = 0; i < dept.length; i++) {
    deptOptions.push(dept[i].dep_ID);
  }
  const optionsDept = dept.map((e) => {
    return <Option value={e.dep_ID}>{e.departmentName}</Option>;
  });
  const EmpOptions = [];
  for (let i = 0; i < emp.length; i++) {
    EmpOptions.push(emp[i].emp_ID, emp[i].fullName);
  }
  const optionsEmp = emp.map((e) => {
    return <Option value={e.emp_ID}>{e.employeeCode}</Option>;
  });

  const optionsShift = shift.map((e) => {
    return <Option value={e.sif_ID}>{e.shiftName}</Option>;
  });

  //search code
  const getEmployeeByCode = (a) => {
    setSearching(a);
  };
  const handleChange = (value) => {
    setHook(value);
  };
  const [hook, setHook] = useState([]);
  return (
    <div className="container">
          <h5>Working Employee Management</h5>
      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-sm-4">
              <Select
                showArrow
                onChange={getDeptID}
                placeholder="Select A Department"
                size="middle"
                style={{ width: 250 }}
              >
                <Option value={""}>All</Option>
                {optionsDept}
              </Select>
            </div>
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <Tooltip placement="topRight" title="Export excel !">
                <Popconfirm title="Do you export to excel!">
                  <Button
                    icon={<VerticalAlignBottomOutlined />}
                    type="primary"
                    id="export"
                    style={{ marginLeft: 15, float: "right" }}
                  >
                    Export
                  </Button>
                </Popconfirm>
              </Tooltip>
              <Tooltip>
                <Button
                  id="btncreate"
                  icon={<SolutionOutlined />}
                  type="primary"
                  onClick={toggleModal}
                  style={{ float: "right" }}
                >
                  Create
                </Button>
              </Tooltip>
              <Modal
                visible={addModal}
                title="Create Employee Shift"
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" onClick={onFinish}>
                    Create
                  </Button>,
                ]}
              >
                <Form {...layout}>
                  <Form.Item
                    label="Employee Code"
                    name="code"
                    rules={[{ required: true }]}
                    hasFeedback
                  >
                    <Select
                      placeholder="Select a employee code"
                      onChange={getEmp}
                      ref={empname}
                    >
                      {optionsEmp}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Shift Name"
                    name="shiftname"
                    rules={[{ required: true }]}
                    hasFeedback
                  >
                    <Select
                      placeholder="Select a shift name"
                      onChange={getShift}
                      ref={empname}
                    >
                      {optionsShift}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Start Date">
                    <DatePicker
                      defaultValue={moment(start, "YYYY-MM-DD")}
                      onChange={onChangeStart}
                      style={{ width: 354 }}
                    />
                  </Form.Item>
                  <Form.Item label="End Date">
                    <DatePicker
                      defaultValue={moment(end, "YYYY-MM-DD")}
                      onChange={onChangeEnd}
                      style={{ width: 354 }}
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row align-items-center" style={{ marginBottom: 15 }}>
            <div className="col-sm-4">
              <Search
                placeholder="Input employee name "
                onSearch={(value) => getEmployeeByCode(value)}
                style={{ width: 250 }}
                size="middle"
                allowClear
                ref={search}
              />
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
              <tbody>{employeeshift}</tbody>
            </table>
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={onChange}
              total={100}
              showQuickJumper
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
