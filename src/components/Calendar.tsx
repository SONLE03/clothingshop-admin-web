"use client";
import { useState } from 'react';

interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
}

interface CalendarProps {
  onDayClick: (day: number) => void;
  events: Event[];
}

function Calendar({ onDayClick, events }: CalendarProps) {
  const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();

  const renderDays = (month: number, year: number, onDayClick: (day: number) => void) => {
    const days = [];
    const daysCount = daysInMonth(month + 1, year);
    for (let i = 1; i <= daysCount; i++) {
      days.push(
        <div
          key={i}
          className="border border-gray-700 p-2 cursor-pointer"
          onClick={() => onDayClick(i)}
        >
          {i}
          {events.filter(event => event.start <= `${year}-${month + 1}-${i}` && event.end >= `${year}-${month + 1}-${i}`).map(event => (
            <div key={event.id} className="bg-blue-500 text-white mt-1 rounded">
              {event.title}
            </div>
          ))}
        </div>
      );
    }
    return days;
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {renderDays(4, 2024, onDayClick)}
    </div>
  );
}

export default Calendar;