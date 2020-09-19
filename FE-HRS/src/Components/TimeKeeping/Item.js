import React from 'react';
import { Tag, Tooltip, Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import { UserAddOutlined, FolderOpenOutlined, DeleteOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { useState } from 'react';
const Item = (props) => {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const { Option } = Select;
    const checkTimeIn = (a) => {
        if (a !== "") {
            {
                return (
                    <Tag color="magenta">{a}</Tag>
                );
            }
        }
        else {
            return (
                <Tag color="warning">Absent</Tag>
            );
        }
    }

    const checkTimeOut = (a) => {
        if (a !== "") {
            {
                return (
                    <Tag color="processing">{a}</Tag>
                );
            }
        }
        else {
            return (
                <Tag color="warning">Absent</Tag>
            );
        }
    }
    const makeColor = (a) => {
        if (a === 1) {
            return (
                <Tag color="orange">
                    CA1
                </Tag>
            );
        }
        if (a === 2) {
            return (
                <Tag color="geekblue">
                    CA2
                </Tag>
            );
        }
        if (a === 3) {
            return (
                <Tag color="lime">
                    CA3
                </Tag>
            );
        }
    }
    return (
        <tr>
            <td>{props.e.key}</td>
            <td>{props.e.id}</td>
            <td>{props.e.fullName}</td>
            <td>{props.e.department}</td>
            <td>
                {
                    makeColor(props.e.workingShift)
                }
            </td>
            <td>
                <Tooltip title="Inside">
                    {
                        checkTimeIn(props.e.in)
                    }
                </Tooltip>
                <Tooltip>
                    {
                        checkTimeOut(props.e.out)
                    }
                </Tooltip>
            </td>
        </tr>
    );
}

export default Item;