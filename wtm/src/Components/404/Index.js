import React from 'react';
import { Result, Button } from 'antd';
const Index = (props) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
            style={{marginTop:100}}
        />
    );
}

export default Index;