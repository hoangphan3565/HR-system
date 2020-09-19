import React from 'react';
import MenuBar from '../Header/Index';
import HeaderTop from '../Header/Header';
import Table from './Table';
const  Index=(props)=>{
    return (
        <div className="row">
        <div className="col-xl-2"><MenuBar e={10}/></div>
        <div className="col-xl-10">
            <HeaderTop/>
            <Table />
        </div>
    </div>
    );
}

export default Index;