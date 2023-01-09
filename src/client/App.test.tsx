import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // destructing from exported object
import userEvent from '@testing-library/user-event'; // default export

import { logRoles } from '@testing-library/dom';
import { shallow } from 'enzyme';

import App from './App';

import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Testing ', () => {

  // it('should fetch station on input change', async() => {

  //   // Provide the station data object to be returned
  //   mockedAxios.get.mockResolvedValue({
  //     data: [
  //       {
  //         id: '6920c74c-ee69-47d3-b0cf-84d4998f8781'
  //       },
  //       {
  //         name: 'London Liverpool Street'
  //       }
  //     ],
  //   });

  //   const user = userEvent.setup(); 
  //   render(<App />);
  //   const inputOriginElement = screen.getByRole('textbox', { name: /From/i });
  //    await user.type(inputOriginElement, 'Blundellsands & Crosby')
  //   await waitFor(() => {
  //      const journeyTitle =  screen.getAllByText('Blundellsands & Crosby');
  //   expect(journeyTitle[0]).toHaveTextContent('Blundellsands & Crosby')
  //   expect(journeyTitle[1]).toHaveTextContent('London Liverpool Street')
  //   });
  // });
  
  it('should fetch journey on submit click', async() => {
    // Provide the station data object to be returned
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          journeyTitle: 'Blundellsands & Crosby to London Liverpool Street',
          originStation: 'Blundellsands & Crosby',
          originStationId: '920c74c-ee69-47d3-b0cf-84d4998f8781',
          destinationStationId: '39aafe00-5596-4d5a-9f6b-3befc85d9cc5',
          destinationStation: 'London Liverpool Street',
          price: "£112.359",
          departAt: "2021-01-18T09:22:00.000Z"
        }
      ],
    });

    const user = userEvent.setup(); 
    render(<App />);
    const submitButtonElement = screen.getByRole('button', { name: /Get tickets/i });
     await user.click(submitButtonElement)
    await waitFor(() => {
      const journeyTitle =  screen.getAllByTestId(`journey-details-price`);
      // const journeyTitle =  screen.getAllByText('Blundellsands & Crosby to London Liverpool Street');
    //expect(journeyTitle[0]).toHaveTextContent('£112.359')
    });
  });
  });

describe('<App /> component testing', () => {
  // it('no journey found in case API gives no response ', () => {
  //   render(<App />)
  //   const inputElementLabel = screen.getByRole('textbox', { name: /From/i });
  //   expect(inputElementLabel).toBeInTheDocument();
  // // });
  // it('renders error message on button click if origin and destination input is blank', () => {
  //   render(<App />)
  //   const buttonElement = screen.getByRole('button', { name: /Get tickets/i });
  //   fireEvent.click(buttonElement)
  //   expect(buttonElement).toBeInTheDocument();
  // });
  it('renders label of input element ', () => {
    render(<App />)
    const inputElementLabel = screen.getByRole('textbox', { name: /From/i });
    expect(inputElementLabel).toBeInTheDocument();
  });
  // it('renders roles of container ', () => {
  //   const { container } = render(<App />);
  //  // logRoles(container);

  //   const buttonElement = screen.getByRole('button', { name: /Get tickets/i });
  //   expect(buttonElement).toBeInTheDocument();
  // });

  // it('renders get ', async () => {
  //   const user = userEvent.setup(); 
  //   render(<App />);
  //   const buttonElement = screen.getByRole('button', { name: /Get tickets/i });
  //   await userEvent.click(buttonElement)
  //   //expect(buttonElement).toBeInTheDocument(); 
  // });
  // it('renders get ', async () => {
  //   const user = userEvent.setup(); 
  //   render(<App />);
  //   const buttonElement = screen.getByRole('button', { name: /Get tickets/i });
  //   await userEvent.click(buttonElement)
  //   expect(buttonElement).toBeInTheDocument(); 
  // });

    // it('query by to for input error present in dom dom ', async () => {
      // first use querby then use getby to check
//   render(<App />);
  //  const buttonElement = screen.queryByText('/Get tickets/i');
  //   expect(buttonElement).not.toBeInTheDocument();    
  // });
  // it('query by to check element not  present in dom ', async () => {
//   render(<App />);
  //  const buttonElement = screen.queryByText('/Get tickets/i');
  //   expect(buttonElement).not.toBeInTheDocument();    
  // });

})

