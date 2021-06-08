import React, { useEffect, useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import { useHistory } from "react-router-dom";
import {getAllProductUser} from '../functions/Api';
// import ListProducts from '../components/ListProducts';

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
        setProducts(response.data.data)
    }


    return(
        <>
            <HomeHeader page="Home"/>

            <div className="row d-flex justify-content-center mt-5">
                {
                    products.map((data,index)=>(
                        <div className="col-sm-6 col-lg-3 col-md-4 p-2" key={"productId"+index}>
                            <div className="shadow productList">
                                {console.log(data)}

                                <h4>{data.name}</h4>

                                <img src="https://picsum.photos/200" className="shadow" /><br /><br />

                                <p title={data.description}>{(data.description).substr(0,100)}...</p>

                                <span>₹ {data.price}/-</span><br />

                                <button className={data.stock == 2 ? 'btn-danger disabled btn mt-3' : 'btn-success btn mt-3'}>
                                    {data.stock == 2 ? 'Out of stock' : 'Purchase'}
                                </button>

                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}