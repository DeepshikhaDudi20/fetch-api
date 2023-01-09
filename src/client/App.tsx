import React, { useState, MouseEvent, useEffect } from 'react';
// import styled from "styled-components"

import axios from 'axios';
import './App.css';

interface Station {
  id: string;
  name: string;
  code: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

const App: React.FC = () => {
  const [emptyOriginErrorMessage, setOriginErrorMessage] = useState(false);
  const [emptyDestinationMessage, setDestinationErrorMessage] = useState(false);
  const [price, setPrice] = useState(null)
  const [date, setDate] = useState(new Date())
  const [origin, setOrigin] = useState('Blundellsands & Crosby')
  const [destination, setDestination] = useState('London Liverpool Street')
  const [journeyDetailsData, setJourneyDetailsData] = useState([])
  const [stationData, setStationData] = useState([])

  // To fetch responseStations of origin and destination from stations api
  const fetchStationData = async (stationName: any) => {
    try {
      const stationId = await axios.get('https://localhost:8443/stations')
        .then((res) => {
          let responseStations = res.data?.filter((responseStation: any) => {
            return responseStation.name === stationName
          })[0];
          return responseStations.id;
        })
      return stationId;
    }
    catch (error) {
      console.log(`Journey Details ${error}`);
    }
  }

  // on submit of get tickets functionality, call journey api with origin and destination id
  const onSubmit = async () => {
    if (origin.trim().length === 0) {
      setOriginErrorMessage(true);
    }
    if (destination.trim().length === 0) {
      setDestinationErrorMessage(true)
    }
    if (origin.trim().length !== 0 && destination.trim().length !== 0) {
      const originStationId = await fetchStationData(origin)
      const destinationStationId = await fetchStationData(destination)
      fetchJourneyDetails1(originStationId, destinationStationId)
    }
  }

// to fetch jouney api in specific objevt formet
  const fetchJourneyDetails = async (originStationId: any, destinationStationId: any) => {
    try {
      const journeyDetails: any = await axios.get('https://localhost:8443/journeys')
        .then((res) => {
          let responseJourneyDetails = res.data?.filter((responseJourneyDetail: any) => {
            return (responseJourneyDetail.origin === originStationId && responseJourneyDetail.destination === destinationStationId)
          })[0];
          return [{
            journeyTitle: `${origin} to ${destination}`,
            originStation: origin,
            originStationId: originStationId,
            destinationStationId: destinationStationId,
            destinationStation: destination,
            price: `£${responseJourneyDetails.price.amount}`,
            departAt: responseJourneyDetails.departAt
          }];
        })
      setJourneyDetailsData(journeyDetails);
      return journeyDetails;
    }
    catch (error) {
      console.log(`Journey Details ${error}`);
    }
  }

  // Return multiple data from journey api
  const fetchJourneyDetails1 = async (originStationId: any, destinationStationId: any) => {
    try {
      const journeyDetails : any = await axios.get('https://localhost:8443/journeys')
        .then((res) => {
         return res.data?.filter((responseJourneyDetail: any) => {
            return (responseJourneyDetail.origin === originStationId && responseJourneyDetail.destination === destinationStationId)
          })
        })
      setJourneyDetailsData(journeyDetails);
      console.log(`testing Outside loop journeyDetails  ${journeyDetails}`)
      return journeyDetails;
    }
    catch (error) {
      console.log(`Journey Details ${error}`);
    }
  }
  // On change of origin input, set origin input value and clear error message
  const onOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrigin(event.target.value);
    setOriginErrorMessage(false);
  };

    // On change of destination input, set origin input value and clear error message
  const onDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
    setDestinationErrorMessage(false);
  };

  return (
    <div className="App">
      <div>
        {/* <section aria-labelledby="Book ticket"> */}
        {/* <form onChange={getJourneyData}> */}
        <div className='OriginStation'>
          <label htmlFor='origin-station'> From</label>
          <input type="text" id="origin-station" value={origin} onChange={onOriginChange} placeholder="Enter Origin Station"></input>
          {emptyOriginErrorMessage && (
            <p className="errorOrigin"> 'Please enter origin origin message' </p>
          )}
        </div>
        <div className='DestinationStation'>
          <label htmlFor='destination-station'> Destination</label>
          <input type="text" id="destination-station" value={destination} onChange={onDestinationChange} placeholder="Enter Destination Station" />
          {emptyDestinationMessage && (
            <p className="errorDestination"> 'Please enter destination destination message' </p>
          )}
        </div>
        {/* aria-disabled="true" */}
        <button data-testid="button-search-tickets" name="button" onClick={onSubmit}>
          Get tickets
        </button>
        {journeyDetailsData.map((data: any) => {
          return (
            <>
              <div className='journey-details'>
                {/* <div className='journey-details-title'>
                  <span data-testid="journey-details-title">{data.journeyTitle}</span>
                </div> */}
                <div className='journey-details-price'>
                  <label>Price:</label>
                  <div data-testid="journey-details-price">{data.price.amount}</div>
                </div>
                <div className='journey-details-departs'>
                  <label>Departs At:</label>
                  <div>{data.departAt}</div>
                </div></div></>)
        })}
        {/* </form> */}
        {/* </section > */}
      </div>

    </div>
  );
}
export default App;

