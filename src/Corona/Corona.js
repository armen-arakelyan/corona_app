import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Corona.css';
import {useForm} from 'react-hook-form'

const Corona=()=>{
    const [inpDisplay,setInpDisplay]=useState(false)
    const [data,setData]=useState([]);
    const [country,setCountry]=useState('am');
    const {register,handleSubmit}=useForm();

    const getData=data=>{
        setCountry(data.country)
    }
    useEffect(()=>{
        axios.get(`https://covid19.mathdro.id/api/countries/${country}`)
        .then(corona=>setData([corona.data]))
    },[country])  //confirmed,deaths

    return(
        <div className="corona_page">
            <div className="corona_content">
                <div className="corona_box">
                    <h1 onClick={()=>setInpDisplay(!inpDisplay)}>{country}</h1>
                    <form className="corona_change" style={{display:inpDisplay?"flex":"none"}} onSubmit={handleSubmit(getData)}>
                    <input onChange={e=>setCountry(e.target.value)} {...register('country')} />
                    <button>Change</button>
                    </form>
                    <div className="corona_data">
                        {
                           data.length===0?"":data.map((v,i)=><span className="corona_array" key={i}>
                                <div className="corona_values"><b>Confirmed:</b><p>{v.confirmed.value}</p><img src="icons/icon.png" /></div>
                                <div className="corona_values"><b>Deaths:</b><p style={{color:"#85144b"}}>{v.deaths.value}</p><img src="icons/icon.png" /></div>
                                <div className="corona_values"><b>Percent:</b><p style={{color:"#85144b"}}>{Math.round(v.deaths.value*100/v.confirmed.value)}%</p><img src="icons/icon.png" /></div>
                            </span>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Corona;