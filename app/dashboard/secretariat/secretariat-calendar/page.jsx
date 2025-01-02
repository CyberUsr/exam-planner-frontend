"use client";

import React, { useState } from "react";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SecretariatCalendar() {
  const [startDate, setStartDate] = useState(""); // Start date input
  const [duration, setDuration] = useState(2); // Duration in weeks
  const [calendar, setCalendar] = useState([]); // Calendar state

  const generateCalendar = () => {
    if (!startDate || duration < 1) {
      alert("Please enter a valid start date and duration.");
      return;
    }

    const calendarData = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < duration * 7; i++) {
      calendarData.push({
        date: format(currentDate, "yyyy-MM-dd"), // Format date for display
        slots: [], // Empty slots for exams
      });
      currentDate = addDays(currentDate, 1);
    }

    setCalendar(calendarData);
  };

  const addSlotToDay = (index) => {
    const newCalendar = [...calendar];
    newCalendar[index].slots.push(
      `Exam Slot ${newCalendar[index].slots.length + 1}`
    );
    setCalendar(newCalendar);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Exam Calendar</h2>

      {/* Form to generate calendar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateCalendar();
        }}
        className="grid gap-4 mb-6"
      >
        <div>
          <label htmlFor="startDate" className="block font-medium">
            Start Date
          </label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="block font-medium">
            Duration (weeks)
          </label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min={1}
            required
          />
        </div>

        <Button type="submit">Generate Calendar</Button>
      </form>

      {/* Display the generated calendar */}
      {calendar.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Generated Calendar</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {calendar.map((day, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-2">{day.date}</h4>
                <ul className="list-disc pl-4 mb-2">
                  {day.slots.map((slot, slotIndex) => (
                    <li key={slotIndex}>{slot}</li>
                  ))}
                </ul>
                <Button onClick={() => addSlotToDay(index)} className="w-full">
                  Add Exam Slot
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
