import React, { createContext, useContext, useEffect, useState } from 'react';
import icon from '../../images/peopleicon.png';
import FakeData from '../../Data/FakeData.json';
import './AnotherDestination.css';


export const valueContext = createContext();

const AnotherDestination = (props) => {
    console.log(props)    

    const {data,datatow}= props;
    
    console.log(data,datatow);
    
  const [fakeData,setFakeData] = useState([]);
  
 


  const [value, setValue] = useState();
  

  const image = fakeData.map((data) => data.image);

  useEffect(() => {
    setFakeData(FakeData)
},[])
    return (
        <div className="box">
          <div className="sm-box">
          <li>{data}</li>
          <br/>
          <li>{datatow}</li>
          </div>
          <div className='sm-box-1'>
            <img style={{width: '20%'}} src={image} alt=""/>
            
            <h5 style={{textAlign: 'center'}}>Bike</h5>
            <div>
            <img style={{width: '50%'}} src={icon} alt=""/>
            </div>
            <h5>4</h5>
            <h4 style={{marginLeft: '100px'}}>$65</h4>
          </div>
          <div className='sm-box-2'>
            <img style={{width: '20%'}} src={image} alt=""/>
            
            <h5 style={{textAlign: 'center'}}>Bike</h5>
            <div>
            <img style={{width: '50%'}} src={icon} alt=""/>
            </div>
            <h5>4</h5>
            <h4 style={{marginLeft: '100px'}}>$65</h4>
          </div>
          <div className='sm-box-3'>
            <img style={{width: '20%'}} src={image} alt=""/>
            
            <h5 style={{textAlign: 'center'}}>Bike</h5>
            <div>
            <img style={{width: '50%'}} src={icon} alt=""/>
            </div>
            <h5>4</h5>
            <h4 style={{marginLeft: '100px'}}>$65</h4>
            </div>
        </div>
    );
};

export default AnotherDestination;