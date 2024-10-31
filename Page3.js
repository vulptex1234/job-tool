import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Page3.css';

function Page3() {
  const [shifts, setShifts] = useState([{ start: "", end: "" }]);
  const [results, setResults] = useState([]);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [overtimeRanges, setOvertimeRanges] = useState([]);
  const [lateNightHours, setLateNightHours] = useState(0);
  const [lateNightRanges, setLateNightRanges] = useState([]);
  const [totalExtraHours, setTotalExtraHours] = useState(0);

  const calculateHours = (start, end) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    const startDate = new Date(0, 0, 0, startHour, startMinute);
    const endDate = new Date(0, 0, 0, endHour, endMinute);

    let diff = (endDate - startDate) / (1000 * 60 * 60); // calculate difference in hours
    if (diff < 0) {
      diff += 24; // handle cases where the end time is past midnight
    }
    return diff;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleCalculate = () => {
    let totalWorkedHours = 0;
    let overtime = 0;
    let overtimeRanges = [];
    let lateNightWorked = 0;
    let lateNightRanges = [];
    let shiftResults = [];

    shifts.forEach((shift, index) => {
      if (shift.start && shift.end) {
        const worked = calculateHours(shift.start, shift.end);
        totalWorkedHours += worked;
        shiftResults.push(`労働時間: ${worked.toFixed(2)} 時間`);

        if (totalWorkedHours > 8) {
          const overtimeStart = 8 - (totalWorkedHours - worked);
          overtime += worked - overtimeStart;
          const overtimeStartDate = new Date(0, 0, 0, shift.start.split(':')[0], shift.start.split(':')[1]);
          overtimeStartDate.setHours(overtimeStartDate.getHours() + overtimeStart);
          overtimeRanges.push(`${formatTime(overtimeStartDate)} ~ ${shift.end}`);
        }

        // 深夜勤務時間の計算
        const lateNightStart = "22:00";
        const lateNightEnd = "05:00";

        if (shift.start < lateNightEnd || shift.end > lateNightStart) {
          if (shift.start < lateNightEnd && shift.end <= lateNightEnd) {
            lateNightWorked += calculateHours(shift.start, shift.end);
            lateNightRanges.push(`${shift.start} ~ ${shift.end}`);

          } else if (shift.start < lateNightEnd && shift.end > lateNightEnd) {
            lateNightWorked += calculateHours(shift.start, lateNightEnd);
            lateNightRanges.push(`${shift.start} ~ ${lateNightEnd}`);

          } else if (shift.start >= lateNightStart && shift.end > lateNightStart) {
            lateNightWorked += calculateHours(shift.start, shift.end);
            lateNightRanges.push(`${shift.start} ~ ${shift.end}`);

          } else if (shift.start < lateNightStart && shift.end > lateNightStart) {
            lateNightWorked += calculateHours(lateNightStart, shift.end);
            lateNightRanges.push(`${lateNightStart} ~ ${shift.end}`);
          }
        }
      }
    });

    setResults(shiftResults);
    setOvertimeHours(overtime);
    setOvertimeRanges(overtimeRanges);
    setLateNightHours(lateNightWorked);
    setLateNightRanges(lateNightRanges);
    setTotalExtraHours(overtime + lateNightWorked); // 残業時間と深夜時間の合計を設定
  };

  const clearShifts = () => {
    setShifts([{ start: "", end: "" }]);
    setResults([]);
    setOvertimeHours(0);
    setOvertimeRanges([]);
    setLateNightHours(0);
    setLateNightRanges([]);
    setTotalExtraHours(0); // 合計値もリセット
  };

  const addShift = () => {
    setShifts([...shifts, { start: "", end: "" }]);
  };

  const handleShiftChange = (index, field, value) => {
    const newShifts = shifts.slice();
    newShifts[index][field] = value;
    setShifts(newShifts);
  };

  return (
    <div className="App">
      <h1>⏱️加算 & 残業⏱️</h1>
      <div className="time-inputs-container">
        <div className='label-input'>
            <div>出勤時間:</div>
            <span className="tilde">~</span>
            <div>退勤時間:</div>
        </div>
        {shifts.map((shift, index) => (
          <div className="time-inputs" key={index}>
            <div className="time-input">
              <input
                type="time"
                value={shift.start}
                step="900" // 15分間隔に設定
                onChange={(e) => handleShiftChange(index, "start", e.target.value)}
              />
            </div>
            <span className="tilde">~</span>
            <div className="time-input">
              <input
                type="time"
                value={shift.end}
                step="900" // 15分間隔に設定
                onChange={(e) => handleShiftChange(index, "end", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="add-shift-button" onClick={addShift}>勤務時間追加</button>
        <button className="clear-button" onClick={clearShifts}>クリア</button>
      </div>
      <button className="calculate-button" onClick={handleCalculate}>計算</button>

      <div className="results">
        {results.map((result, index) => (
          <h2 key={index}>{index + 1}. {result}</h2>
        ))}
        {overtimeHours > 0 && (
          <h2>残業時間: {overtimeRanges.join(", ")}<br />- 残業時間数(a): {overtimeHours.toFixed(2)} 時間</h2>
        )}
        {lateNightHours > 0 && (
          <h2>深夜勤務時間: {lateNightRanges.join(", ")}<br />- 深夜時間数(b): {lateNightHours.toFixed(2)} 時間</h2>
        )}
        {(overtimeHours > 0 || lateNightHours > 0) && (
          <h2>残業時間数合計: {totalExtraHours.toFixed(2)} 時間</h2>
        )}
      </div>

      <Link to="/">
        <button className="back-button">HomePageへ戻る</button>
      </Link>
    </div>
  );
}

export default Page3;