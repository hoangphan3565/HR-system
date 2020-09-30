import React from "react";
import {
  Tag,
  Tooltip,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Pagination,
  notification,
  Popconfirm,
} from "antd";
import {
  UserAddOutlined,
  FolderOpenOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useState, useRef } from "react";
import { useEffect } from "react";
import EmployeeShiftService from "../../Services/EmployeeShiftService";
import EmployeeServices from "../../Services/EmployeeServices";
import ShiftService from "../../Services/ShiftService";
import moment from "moment";
import UserActivityService from '../../Services/UserActivityService';
const Item = (props) => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const [addVisible, setAddVisible] = useState(false);
  const [data1, setData] = useState([]);
  const [shift, setShift] = useState([]);
  const [shiftID, setShiftID] = useState([]);
  const [shiftID1, setShiftID1] = useState([]);
  const [emps, setEmpS] = useState([]);
  const [emp, setEmp] = useState([]);
  const [form] = Form.useForm();
  const [start, setStartDate] = useState("2020-09-28");
  const [end, setEndDate] = useState("2020-09-28");
  const id = useRef();
  const startDate1 = useRef();
  const endDate1 = useRef();
  const code = useRef();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { Option } = Select;
  const color = [
    "magenta",
    "purple",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
  ];

  const makecolor = (a) => {
    for (let i = 0; i < color.length; i++) {
      if (a === "Department 0" + i) {
        return <Tag color={color[i]}>D{i}</Tag>;
      }
    }
  };
  useEffect(() => {
    EmployeeShiftService.list().then((res) => {
      setEmpS(res.data);
    });
    ShiftService.list().then((res) => {
      setShift(res.data);
    });
  }, []);
  const toggleAddVisible = () => {
    setAddVisible(true);
    setStartDate(props.e.startdate);
    setEndDate(props.e.enddate);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleAddCancel = () => {
    setAddVisible(false);
  };
  const pageNumbers = [];
  for (var i = 1; i <= Math.ceil(data1.length / perPage); i++) {
    pageNumbers.push(i);
  }
  const currentEmpS = data1.slice(indexOfFirst, indexOfLast);
  const data2 = currentEmpS.map((data, index) => {
    return (
      <tr key={data.ems_ID}>
        <td>{data.ems_ID}</td>
        <td>{data.shift.shiftName}</td>
        <td>{makecolor(data.employee.department.departmentName)}</td>
        <td>{data.startdate}</td>
        <td>{data.enddate}</td>
      </tr>
    );
  });
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const onShowSizeChange = (current, pageSize) => {
    setPerPage(pageSize);
  };
  useEffect(() => {
    form.setFieldsValue({
      ems_ID: props.e.ems_ID,
      employeeCode: props.e.employee.employeeCode,
      shift: props.e.shift.sif_ID,
    });
  });
  const onClickDetail = () => {
    setVisible(true);
    EmployeeShiftService.htr(props.e.employee.employeeCode).then((res) => {
      setData(res.data);
    });
  };
  const optionsShift = shift.map((e) => {
    return <Option value={Number(e.sif_ID)}>{e.shiftName}</Option>;
  });

  const getEmp = (a) => {
    EmployeeServices.list(a).then((res) => {
      setEmp(res.data);
    });
  };
  const getShift = (a) => {
    setShiftID(a);
  };
  const onChangeStart = (date, dateString) => {
    setStartDate(dateString);
  };
  const onChangeEnd = (date, dateString) => {
    setEndDate(dateString);
  };

  const onFinish = () => {
    const ems = {
      startdate: start,
      enddate: end,
    };
    EmployeeShiftService.update(props.e.ems_ID, iduser, id.current.props.value, ems).then(res => {
      setAddVisible(false);
      props.test("done");
      props.test("");
      const actvity = {
        "usr_ID": iduser,
        "activityName": `Update employeeshift with code ${props.e.ems_ID}`,
        "isdeleted": false,
      }
      const args = {
        message: "Updated Successfully",
        description: "A  employee shift was updated in Your System !",
        duration: 1,
      };
      UserActivityService.add(actvity).then();
      notification.success(args);
    })

  };
  const [iduser, setId] = useState("");
  useEffect(() => {
    setId(localStorage.getItem("id"))
  })
  const onDelete = () => {
    EmployeeShiftService.del(props.e.ems_ID, iduser).then((res) => {
      props.test("done");
      props.test("");
    });
    const actvity = {
      "usr_ID": iduser,
      "activityName": `Deleted employeeshift with code ${props.e.ems_ID}`,
      "isdeleted": false,
    }
    const args = {
      message: "Deleted Successfully",
      description: "A new employee shift was deleted in Your System !",
      duration: 1
    };
    UserActivityService.add(actvity).then();
    notification.success(args);
  };
  return (
    <tr key={props.e.ems_ID}>
      <td>{props.e.ems_ID}</td>
      <td>{props.e.employee.employeeCode}</td>
      <td>{props.e.employee.fullName}</td>
      <td>{makecolor(props.e.employee.department.departmentName)}</td>
      <td>
        {props.e.employee.position.positionName === "Công nhân" ? (
          <Tag color={"magenta"}>CN</Tag>
        ) : (
            <Tag color="green">NVVP</Tag>
          )}
      </td>
      <td>{props.e.shift.shiftName}</td>

      <td>{props.e.startdate}</td>
      <td>{props.e.enddate}</td>
      <td>
        <Tooltip title="His/her history">
          <Button
            className="update"
            shape="circle"
            icon={<FolderOpenOutlined />}
            onClick={onClickDetail}
            style={{ backgroundColor: "orange" }}
          />
          <Modal
            title="Working Shift History"
            visible={visible}
            cancelText="Close"
            onCancel={handleCancel}
            width={1000}
            footer={[<Button key="back" onClick={handleCancel}>
              Cancel
          </Button>]}
          >
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Shift Name</th>
                  <th>Department</th>
                  <th>Start Date </th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>{data2}</tbody>
            </table>
            <Pagination
              showSizeChanger
              current={currentPage}
              onShowSizeChange={onShowSizeChange}
              onChange={onChange}
              total={data1.length}
              showQuickJumper
            />
          </Modal>
        </Tooltip>

        <Tooltip title="Edit">
          <Button
            className="edit"
            shape="circle"
            icon={<EditOutlined />}
            onClick={toggleAddVisible}
            style={{ backgroundColor: "rgb(107, 189, 243)" }}
          />
          <Modal
            visible={addVisible}
            title="Edit Working Shift"
            onCancel={handleAddCancel}
            footer={[
              <Button key="back" onClick={handleAddCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                onClick={onFinish}
              >
                Update
              </Button>,
            ]}
          >
            <Form {...layout} form={form} onFinish={onFinish}>
              <Form.Item label="Employee Code" name="employeeCode" hasFeedback>
                <Input size="middle" ref={code} readOnly />
              </Form.Item>

              <Form.Item label="Working Shift" name="shift">
                <Select
                  showArrow
                  //onChange={getShift}
                  size="middle"
                  style={{ width: 350 }}
                  ref={id}
                >
                  {optionsShift}
                </Select>
              </Form.Item>
              <Form.Item label="Start Date">
                <DatePicker
                  defaultValue={moment(start, "YYYY-MM-DD")}
                  onChange={onChangeStart}
                  style={{ width: 354 }}
                  ref={startDate1}
                />
              </Form.Item>
              <Form.Item label="End Date">
                <DatePicker
                  defaultValue={moment(end, "YYYY-MM-DD")}
                  onChange={onChangeEnd}
                  style={{ width: 354 }}
                  ref={endDate1}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Tooltip>
        <Tooltip placement="topRight" title="Delete!">
          <Popconfirm
            placement="top"
            title="Are you sure delete ?!"
            onConfirm={onDelete}
          >
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              style={{ backgroundColor: "rgb(236, 118, 82)" }}
            />{" "}
          </Popconfirm>
        </Tooltip>
      </td>
    </tr>
  );
};
export default Item;
