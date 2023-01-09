import React, { useState, MouseEvent, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";


interface IJourneyData {
    price: string;
}
interface IOrigin {
    origin: string;
    destination: string;
    journeyDetailsData: IJourneyData[]
}
const JourneyPlanner: React.FC<IOrigin>=(props)=>{
    const location = useLocation();
    return(
        <>
        <div className='journey-details'>
                  <span data-testid="journey-details-origin">{props.origin}</span>
                  <span data-testid="journey-details-origin"> to </span>
                  <span data-testid="journey-details-origin">{props.destination}</span>
                </div> 
                {location.state.journeyDetailsData.map((data: any) => {
          return (
            <>

                <div className='journey-details-price'>
                  <label>Price:</label>
                  <div data-testid="journey-details-price">{data.price.amount}</div>
                </div></>)
        })}
        </>
    );
}

export default JourneyPlanner
