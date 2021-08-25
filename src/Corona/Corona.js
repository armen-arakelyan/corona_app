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
        axios.get(`https://corona-api.com/countries/${country}`)
        .then(corona=>setData([corona.data]))
    },[country]) 

    return(
        <div className="corona_page">
            <div className="corona_content">
                <div className="corona_box">
                    <h1 onClick={()=>setInpDisplay(!inpDisplay)}>{country}</h1>
                    <form className="corona_change" style={{display:inpDisplay?"flex":"none"}} onSubmit={handleSubmit(getData)}>
                    <input maxLength="3" onChange={e=>setCountry(e.target.value)} {...register('country')} />
                    <button>Change</button>
                    </form>
                    <div className="corona_data">
                        {
                           data.length===0?"":data.map((v,i)=><span className="corona_array" key={i}>
                                <div className="corona_values"><b>Confirmed</b><p>&nbsp;{v.data.latest_data.confirmed}</p><img src="icons/icon.png" /></div>
                                <div className="corona_values"><b>Recovered</b><p style={{color:"#1BA555"}}>&nbsp;{v.data.latest_data.recovered}</p><img src="icons/icon.png" /></div>
                                <div className="corona_values"><b>Critical</b><p style={{color:"#FF880E"}}>&nbsp;{v.data.latest_data.critical}</p><img src="icons/icon.png" /></div>
                                <div className="corona_values"><b>Deaths</b><p style={{color:"#85144b"}}>&nbsp;{v.data.latest_data.deaths}</p><img src="icons/icon.png" /></div>
                                <div className="corona_values"><b>Percent</b><p style={{color:"#85144b"}}>&nbsp;{Math.round(v.data.latest_data.deaths*100/v.data.latest_data.confirmed)}%</p><img src="icons/icon.png" /></div>
                            </span>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Corona;