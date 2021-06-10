import React, { useEffect, useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import { useHistory } from "react-router-dom";
import {getAllProductUser, orderProduct} from '../functions/Api';

export default function Home(){

    useEffect(()=>{
        getAllProduct();
    }, []);

    const [msg, setMsg] = useState('');
    const [products, setProducts] = useState([]);
    const history = useHistory();
    if(! localStorage.getItem('bToken')) history.push('/login')

    async function getAllProduct() {
        let response = await getAllProductUser()
        if(response.data.success) {
            setProducts(response.data.data)
            setMsg(response.data.msg)
        }
        else if (! response.data.success) setMsg(response.data.msg)
        else setMsg('Please try again later')
    }

    async function purchaseProduct(pid, paymentMethod = 'COD'){
        if(window.confirm("Purchase?")){
            let response = await orderProduct({pid, paymentMethod})
            if(response.data.success) {
                setMsg(response.data.msg)
                setTimeout(() => {
                    history.push('/myOrders')
                }, 1000);
            }
            else if (! response.data.success) setMsg(response.data.msg)
            else setMsg('Please try again later')
        }
    }

    return(
        <>
            <HomeHeader page="Home"/>

            <center className="mt-3">{(msg ? msg : '')}</center>
            <div className="row d-flex justify-content-center mt-2">
                {
                    products.map((data,index)=>(
                        <div className="col-sm-6 col-lg-3 col-md-4 p-2" key={"productId"+index}>
                            <div className="shadow productList">

                                <h4>{data.name}</h4>
                                <img src="https://picsum.photos/200" className="shadow" alt={data.name} /><br /><br />

                                <p title={data.description}>{(data.description).substr(0,100)}...</p>

                                <span>₹ {data.price}/-</span><br />

                                <button onClick={e=>{purchaseProduct(data._id)}} className={data.stock === 0 ? 'btn-danger disabled btn mt-3' : 'btn-success btn mt-3'}>
                                    {data.stock === 0 ? 'Out of stock' : 'Purchase'}
                                </button>

                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}