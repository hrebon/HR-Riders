import React, { useEffect, useState } from "react";
import FakeData from '../../Data/FakeData.json';
import Card from "../Card/Card";
import  { Breakpoint } from 'react-socks';

import "./Home.css";

const Home = () => {
    
    const [use, setUse] = useState([]);
    useEffect(() =>{
        setUse(FakeData);
    },[])
  return (
    <Breakpoint customQuery="(min-width: 500px) and (max-width: 1400px)">
    <div className="home">
        {
            use.map(use => <Card user={use}></Card>)
        }
    </div>
    </Breakpoint>
  );
};

export default Home;
