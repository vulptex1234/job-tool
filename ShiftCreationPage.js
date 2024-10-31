import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ShiftCreationPage.css';

function ShiftCreationPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const initialYear = currentMonth === 12 ? currentYear + 1 : currentYear;

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(nextMonth);
  const [shifts, setShifts] = useState({});

  const daysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  const handleYearChange = (e) => setYear(Number(e.target.value));
  const handleMonthChange = (e) => setMonth(Number(e.target.value));

  const handleShiftChange = (day, type, value) => {
    setShifts((prevShifts) => ({
      ...prevShifts,
      [day]: { ...prevShifts[day], [type]: value },
    }));
  };

  const copyToClipboard = () => {
    let text = `${year}年${month}月 シフト表\n\n`;
    for (let i = 1; i <= daysInMonth(year, month); i++) {
      const date = new Date(year, month - 1, i);
      const weekday = weekdays[date.getDay()];
      const shift = shifts[i] || { type: "×", start: "09", end: "18" };

      if (shift.type === '○') {
        text += `${i}日 (${weekday}): 1日OK\n`;
      } else if (shift.type === '×') {
        text += `${i}日 (${weekday}): 休み\n`;
      } else if (shift.type === 'custom') {
        text += `${i}日 (${weekday}): ${shift.start || "09"}時 ~ ${shift.end || "23"}時\n`;
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => alert('シフト表がクリップボードにコピーされました'))
        .catch(err => alert('コピーに失敗しました'));
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        alert('シフト表がクリップボードにコピーされました');
      } catch (err) {
        alert('コピーに失敗しました');
      }
      document.body.removeChild(textArea);
    }
  };

  const days = Array.from({ length: daysInMonth(year, month) }, (_, i) => {
    const date = new Date(year, month - 1, i + 1);
    return {
      day: i + 1,
      weekday: weekdays[date.getDay()],
    };
  });

  return (
    <div className="ShiftCreationPage">
      <h1>シフト表作成📆</h1>
      <div className="date-select">
        <label>
          年:
          <select value={year} onChange={handleYearChange}>
            {[...Array(101)].map((_, index) => {
              const yearOption = currentYear - 50 + index;
              return (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          月:
          <select value={month} onChange={handleMonthChange}>
            {[...Array(12)].map((_, index) => {
              const monthOption = index + 1;
              return (
                <option key={monthOption} value={monthOption}>
                  {monthOption}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div id="shift-table">
        <table className="shift-table">
          <thead>
            <tr>
              <th>日付</th>
              <th>曜日</th>
              <th>勤務可能時間</th>
            </tr>
          </thead>
          <tbody>
            {days.map(({ day, weekday }) => (
              <tr key={day}>
                <td>{day}</td>
                <td className={weekday === '土' ? 'saturday' : weekday === '日' ? 'sunday' : ''}>{weekday}</td>
                <td>
                  <select
                    value={shifts[day]?.type || "×"}
                    onChange={(e) => handleShiftChange(day, 'type', e.target.value)}
                  >
                    <option value="○">1日OK</option>
                    <option value="×">休み</option>
                    <option value="custom">時間限定</option>
                  </select>
                  {shifts[day]?.type === 'custom' && (
                    <div className="custom-time">
                      <select
                        value={shifts[day]?.start || "09"}
                        onChange={(e) => handleShiftChange(day, 'start', e.target.value)}
                      >
                        {[...Array(24)].map((_, hour) => (
                          <option key={hour} value={hour.toString().padStart(2, '0')}>
                            {hour.toString().padStart(2, '0')}時
                          </option>
                        ))}
                      </select>
                      <span> ~ </span>
                      <select
                        value={shifts[day]?.end || "23"}
                        onChange={(e) => handleShiftChange(day, 'end', e.target.value)}
                      >
                        {[...Array(24)].map((_, hour) => (
                          <option key={hour} value={hour.toString().padStart(2, '0')}>
                            {hour.toString().padStart(2, '0')}時
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='button-container-scp'>
        <Link to="/">
            <button className="back-button">HomePageへ戻る</button>
          </Link>
          <button className="copy-button" onClick={copyToClipboard}>
          シフト表をコピー
        </button>
      </div>
        
    </div>
  );
}

export default ShiftCreationPage;