import logo from './logo.svg';
import './App.css';
import { DateBox } from './DateBox';
import StockChart from './StockChart';
import { useEffect, useState } from 'react';


function App() {
  const dates = [
    // Your stock price data here, example:
    { x: '2023-10-01', y: 5000000 },
    { x: '2023-10-02', y: 7000000 },
    { x: '2023-10-03', y: 6000000 },
    // Add more date-value pairs
  ];
  let [fromDate,changeFromDate]=useState('');
  let [ToDate,changeToDate]=useState('');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

  const getDateComponents = (dateString) => {
    const date = new Date(dateString); // Create a Date object from the date string
    const day = String(date.getDate()).padStart(2, '0'); // Get day (01-31)
    const monthIndex = date.getMonth(); // Get month index (0-11)
    const month = monthNames[monthIndex]; // Get month name as string
    const year = date.getFullYear(); // Get full year (YYYY)

    return {day,month,year};
  }
var delivery={}
  useEffect(()=>{
    if(fromDate && ToDate)
      {
         let from=getDateComponents(fromDate)
         let to=getDateComponents(ToDate)
    
         delivery={
          day1:from.day,
          day2:to.day,
          month1:from.month,
          month2:to.month,
          year1:from.year,
          year2:to.year
         }
         console.log(delivery)
      }
  },[fromDate,ToDate])
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const response = await fetch('http://localhost:5000/api/dateRange', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(delivery),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response:', data);
    } catch (error) {
        console.error('Error sending date:', error);
    }
};


  return (
   <div className='contanier'>
    <div className="forDate">
      <DateBox change={changeFromDate}/>
      <DateBox change={changeToDate}/>
      <button onClick={(e)=>handleSubmit(e)}>ok</button>
    </div>
    <div className="chartBox">
      <StockChart dates={dates}/>
    </div>
   </div>
  );
}

export default App;
