import React from "react";

import { useHistory } from "react-router";
import "./Card.css";


const Card = (props) => {
  const { vehicle, image } = props.user;
  const history = useHistory()
  console.log(props);
  
  const handleCardClick = () => {
      history.push('/destination')
  }
  return (
      <div onClick={handleCardClick} className="card">
        <img src={image} alt="" />
        <div>
          <h4>
            <b>{vehicle}</b>
          </h4>
        </div>
      </div>
      
    
  );
};

export default Card;
