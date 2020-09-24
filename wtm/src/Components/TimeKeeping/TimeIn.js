import React from 'react';
import { Tooltip, Tag, Popover, TimePicker, Button, Popconfirm, notification } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { useRef } from 'react';
import TimekeepingService from '../../Services/TimekepingService';
function Time(props) {
    const a = props.e.split(' ');
    //console.log(props.e);
    const [visible, setVis] = useState(false);
    const [value, setValue] = useState("");
    const ax = useRef();
    const onClick = () => {
        setVis(true);
        setValue(a[0]);
    }
    const format = 'HH:mm';

    const onUpdate = () => {
        TimekeepingService.update(a[1], value, 1).then(res => {
            if (res.status === 200) {
                props.callback("");
                setVis(false);
                props.callback("d");
            }
        })
    }
    const onChange = (time, timeString) => {
        setValue(timeString);
    }
    const onDelete = () => {

        const args = {
            message: 'Delete Successfully',
            description:
                'This time in  was deleted in Your System !',
            duration: 1,
        };
        TimekeepingService.clear(a[1], 1).then(res => {

            if (res.status === 200) {
                props.callback("");
                setVis(false);
                props.callback("d");
            }
        }, notification.success(args))
    }
    return (
        <Tooltip title="Inside">
            <Tag color="magenta" onClick={onClick}>{a[0]}</Tag>
            <Popover
                visible={visible}
                title="Update"
                placement="bottom"
                content={
                    <div>
                        <TimePicker
                            defaultValue={moment(value, format)}
                            format={format}
                            onChange={onChange}
                        />
                        <Button type="primary" onClick={onUpdate}>Update</Button>
                        <Popconfirm
                            title="Are you sure delele this time?"
                            onConfirm={onDelete}
                        >
                            <Button type="default" style={{ float: "right" }}>Delete</Button>
                        </Popconfirm>
                    </div>
                }
            >

            </Popover>
        </Tooltip>
    );
}

export default Time;