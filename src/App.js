import logo from './logo.svg';
import './App.css';
import { DateBox } from './DateBox';
import StockChart from './StockChart';
import { useEffect, useState } from 'react';


function App() {

  var [dates, setDates] = useState([{x:'2022-11-11',y:20000000}]);
  let [fromDate, changeFromDate] = useState('');
  let [ToDate, changeToDate] = useState('');
  var dataToShow=[];

  useEffect(() => {
    // This will log the updated state after each change
    console.log('Dates updated:', dates);
  }, [dates]);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const months = {
    January: "01", February: "02", March: "03", April: "04", May: "05", June: "06",
    July: "07", August: "08", September: "09", October: "10", November: "11", December: "12"
  };

  const generateDateData = (startDate, endDate) => {
    const data = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      const value = Math.floor(Math.random() * 100) + 100; // Random stock price
      data.push([Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()), value]);
      currentDate.setDate(currentDate.getDate() + 1); // Increment day
    }
    return data;
  }
  const getDateComponents = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const monthIndex = date.getMonth();
    const month = monthNames[monthIndex];
    const year = date.getFullYear();

    return { day, month, year };
  }
  var delivery = {}
  useEffect(() => {
    if (fromDate && ToDate) {
      let from = getDateComponents(fromDate)
      let to = getDateComponents(ToDate)

      delivery = {
        day1: from.day,
        day2: to.day,
        month1: from.month,
        month2: to.month,
        year1: from.year,
        year2: to.year
      }
      console.log(delivery)


    }
  }, [fromDate, ToDate])


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setDates([{ x: '2022-11-11', y: 20000000 }]); // Set initial dummy date if needed
  
    try {
      const response = await fetch('http://localhost:5000/api/dateRange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(delivery), // Assuming delivery is properly defined elsewhere
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      // Map over the received data and create an array of objects to update state
      const dataToShow = data.map((a) => {
        let dateAndPeople = {
          x: `${a.arrival_date_year}-${months[a.arrival_date_month]}-${a.arrival_date_day_of_month}`,
          y: parseInt(a.adults) + parseInt(a.babies) + parseInt(a.children),
        };
        return dateAndPeople;
      });
  
      // Update the state after the dataToShow array is fully prepared
      setDates(dataToShow);
      console.log(dates);
  
    } catch (error) {
      console.error('Error sending date:', error);
    }
  };
  


  return (
    <div className='contanier'>
      <div className="forDate">
        <DateBox change={changeFromDate} />
        <DateBox change={changeToDate} />
        <button onClick={(e) => handleSubmit(e)}>ok</button>
      </div>
      <div className="chartBox">
        <StockChart dates={dates} />
      </div>
    </div>
  );
}

export default App;
