import React,{useState} from 'react';
import HeaderTop from '../Header/Header';
import MenuBar from '../Header/Index';
import Table from './Table';
const Index = (props) => {

    return (
        <div className="row">
            <div className="col-xl-2"><MenuBar e={3}/></div>
            <div className="col-xl-10">
                <HeaderTop/>
                <Table />
            </div>
        </div>
    );
}
export default Index;