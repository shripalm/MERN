import React, { useEffect, useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import { useHistory } from "react-router-dom";
import {getAllOrderUser} from '../functions/Api';
// import ListProducts from '../components/ListProducts';

export default function MyOrders(){

    useEffect(()=>{
        getAllOrder();
    }, []);

    const [msg, setMsg] = useState('');
    const [orders, setOrders] = useState([]);
    const history = useHistory();
    if(! localStorage.getItem('bToken')) history.push('/login')

    async function getAllOrder() {
        let response = await getAllOrderUser()
        if(response.data.success) {
            setOrders(response.data.data)
            setMsg(response.data.msg)
            console.log(response.data)
        }
        else if (! response.data.success) setMsg(response.data.msg)
        else setMsg('Please try again later')
    }


    return(
        <>
            <HomeHeader page="My orders"/>
            <center className="mt-3">{(msg ? msg : '')}</center>
            <div className="row mt-2">
                {
                    orders.map((data, index)=>(
                        <div className="col-12" key={"orderId"+index}>
                            <div className={ (index+1) === orders.length ? "row p-2 shadow-sm border-bottom border-top" : "row p-2 shadow-sm border-top" }>
                                {/* d-none d-sm-block */}
                                <div className="col-2 col-sm-1 mt-1">
                                    {index+1+'.'}
                                </div>
                                <div className="col-10 col-sm-11 mt-1">

                                    <div className="row">
                                        <div className="col-sm-3">
                                            {data.pName}
                                        </div>
                                        <div className="col-sm-3">
                                            {data.paymentMethod} @ {data.total}/-
                                        </div>
                                        <div className="col-sm-3">
                                            {data.createdAt}
                                        </div>
                                        <div className="col-sm-3">
                                            <button className="btn btn-outline-primary">View Details</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}