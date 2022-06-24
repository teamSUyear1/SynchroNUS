import { PickersDay, StaticDatePicker } from "@mui/lab";
import { Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import useClasses from "../../hooks/useClasses";
import useAssignment from "../../hooks/useAssignment";

function Calendar(props) {
  const { events } = useAssignment();
  const { timetable } = useClasses();
  const { value, setValue, month, setMonth } = props;
  const currentYear = new Date().getFullYear();
  const [highlightedDays, setHighlightedDays] = useState([]);

  function highlight() {
    const filteredAss = events
      .filter(filterHighlight)
      .map((row) => new Date(row.date).getDate());
    const filteredClass = timetable
      .flatMap((task) =>
        task.dtstart.filter((time) => new Date(time).getMonth() === month)
      )
      .map((time) => new Date(time).getDate());
    const filtered = filteredAss.concat(filteredClass);
    const daysToHighlight = filtered.filter((c, index) => {
      return filtered.indexOf(c) === index;
    });
    setHighlightedDays(daysToHighlight);
  }

  function filterHighlight(task) {
    return new Date(task.date).getMonth() === month;
  }

  const handleMonthChange = (date) => {
    setMonth(date.getMonth());
  };

  useEffect(() => {
    highlight();
  }, [events, month]);

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
  );
}

export default Calendar;
