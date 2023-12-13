import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import scheduleData from './scheduleData.json';
import './week.css';

const WeeklySchedule = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [timezone, setTimezone] = useState('UTC');
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    updateWeeklyData();
  }, [currentDate, timezone]);

  const updateWeeklyData = () => {
    // Use moment-timezone library to handle timezones
    const startDate = currentDate.clone().startOf('week').tz(timezone);
    const endDate = currentDate.clone().endOf('week').tz(timezone);

    // Filter data for the current week
    const filteredData = scheduleData.filter((item) => {
      const itemDate = moment.tz(item.Date + ' ' + item.Time, timezone);
      return itemDate.isBetween(startDate, endDate, null, '[]');
    });

    setWeeklyData(filteredData);
  };

  const handleDateChange = (direction) => {
    const newDate = direction === 'next' ? currentDate.clone().add(1, 'week') : currentDate.clone().subtract(1, 'week');
    setCurrentDate(newDate);
  };

  const handleTimezoneChange = (selectedTimezone) => {
    setTimezone(selectedTimezone);
  };
//   const renderSchedule = () => {
//     // Render the schedule UI with checkboxes for each day and date
//     return scheduleData.map((entry) => (
//       <div key={entry.Id}>
//         <input type="checkbox" /> {moment.tz(entry.Date + ' ' + entry.Time, timezone).format('dddd, MMMM D')}
//       </div>
//     ));
//   };
  return (
    <div>
      <div>
        <button className='btn btn-light' onClick={() => handleDateChange('prev')}>Previous</button>
        <span className='text-center span1'>{currentDate.format('MMMM D, YYYY')}</span>
        <button className='btn btn-light' onClick={() => handleDateChange('next')}>Next</button>
      </div>
      <div>
        <label>Timezone:</label><br></br>
        <select onChange={(e) => handleTimezoneChange(e.target.value)}>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option> {/* Change to your desired timezone */}
        </select>
      </div>
      <div>
        {/* Display weekly schedule with checkboxes */}
        {weeklyData.map((item) => (
          <div key={item.Id}>
            <label>
         
              {moment.tz(item.Date + ' ' + item.Time, timezone).format('ddd, MM/D')}&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="checkbox" /> 
              {item.Time}
            </label>
          </div>
        ))}
      </div>
    </div>




    
  );
};

export default WeeklySchedule;
