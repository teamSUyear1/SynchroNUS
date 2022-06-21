import { PickersDay, StaticDatePicker } from '@mui/lab';
import { Badge, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Event from '../../hooks/Event';

function Calendar(props) {
const {events, setEventState} = Event();
const {value, setValue, month, setMonth} = props
const currentYear = new Date().getFullYear();
const [highlightedDays, setHighlightedDays] = useState([]);


const filtered = events
    .filter(filterHighlight)
    .map((row) => new Date(row.date).getDate());
  const daysToHighlight = filtered.filter((c, index) => {
    return filtered.indexOf(c) === index;
  });

  function filterHighlight(task) {
    return new Date(task.date).getMonth() === month;
  }

  const handleMonthChange = (date) => {
    setMonth(date.getMonth());
  };

  useEffect(() => {
    setHighlightedDays(daysToHighlight)
  }, [daysToHighlight]);

  return (
    <StaticDatePicker
                    value={value}
                    views={["year", "month", "day"]}
                    minDate={new Date(currentYear - 10, 0)}
                    maxDate={new Date(currentYear + 10, 12)}
                    displayStaticWrapperAs="desktop"
                    showDaysOutsideCurrentMonth
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    onMonthChange={handleMonthChange}
                    renderDay={(day, _value, DayComponentProps) => {
                      const isSelected =
                        !DayComponentProps.outsideCurrentMonth &&
                        highlightedDays.indexOf(day.getDate()) >= 0;
                      return (
                        <Badge
                          key={day.toString()}
                          overlap="circular"
                          color="secondary"
                          variant="dot"
                          invisible={isSelected ? false : true}
                        >
                          <PickersDay {...DayComponentProps} />
                        </Badge>
                      );
                    }}
                  />
  )
}

export default Calendar