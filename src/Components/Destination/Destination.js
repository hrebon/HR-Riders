import React, { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Destination.css";
import AnotherDestination from "../AnotherDestination/AnotherDestination";
import GoogleMaps from "../GoogleMaps/GoogleMaps";
import  { Breakpoint, BreakpointProvider } from 'react-socks';



const Destination = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  const [data, setData] = useState();
  const [dataTow, setDataTow] = useState();
  const [fakeData, setFakeData] = useState();

  const handleChange = (event) => {
    //setData = (event.target.value);
    setData(event.target.value);
  };
  const handleChangeTow = (event) => {
    setDataTow(event.target.value);
  };

  const [button, setButton] = useState(false);
  const handleSearch = (event) => {};

  return (
    <Breakpoint customQuery="(min-width: 500px) and (max-width: 1400px)">
    <div style={{borderTop: '1px solid black'}}>
      {button && (
        <AnotherDestination data={data} datatow={dataTow}></AnotherDestination>
      )}
      {!button && <form style={{marginTop: '10px'}} className="form" onSubmit={handleSubmit(onSubmit)}>
        {!button && <label htmlFor="firstName">Pick Form</label>}
        <br />
        {!button && <input name="firstName" onBlur={handleChange} />}
        <br />
        {!button && <label htmlFor="lastName">Pick To</label>}
        <br />
        {!button && <input name="lastName" onBlur={handleChangeTow} />}
        <br />
        <br />
        {!button && (
          <button style={{width: '50%', borderRadius: '5px', backgroundColor: 'lightcoral', color: 'white'}} className="button" onClick={() => setButton(!button)}>
            Search
          </button>
        )}
      </form>}

      <div>
        <GoogleMaps></GoogleMaps>
        
      </div>
    </div>
    </Breakpoint>
  );
};



export default Destination;
