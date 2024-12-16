"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  getAllSchedules,
  getSchedulesForGroup,
  getSchedulesForTeacher,
} from "../services/scheduleService";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

const studentNav = [
  { title: "My Exams", url: "/dashboard/student/exams" },
  { title: "Notifications", url: "/dashboard/student/notifications" },
];

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [viewMode, setViewMode] = useState("all"); // "all", "group", or "teacher"
  const [groupId, setGroupId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSchedules = async () => {
    setLoading(true);
    setError("");
    try {
      let data;
      if (viewMode === "all") {
        data = await getAllSchedules();
      } else if (viewMode === "group" && groupId) {
        data = await getSchedulesForGroup(groupId);
      } else if (viewMode === "teacher" && teacherId) {
        data = await getSchedulesForTeacher(teacherId);
      } else {
        setError("Please provide a valid Group ID or Teacher ID.");
        return;
      }
      setSchedules(data);
    } catch (err) {
      setError(err.message || "Failed to fetch schedules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [viewMode, groupId, teacherId]);

  return (
    <SidebarProvider>
      <AppSidebar
        navMain={studentNav}
        user={{
          name: "Student",
          email: "student@example.com",
        }}
      />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 bg-white dark:bg-gray-800 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-xl font-bold">Schedules</h1>
        </header>
        <main className="p-6 bg-gray-100 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">
                View and Manage Schedules
              </h2>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="all">All Schedules</option>
                <option value="group">By Group</option>
                <option value="teacher">By Teacher</option>
              </select>
            </div>
            {viewMode === "group" && (
              <div className="mb-4">
                <label className="mr-2">Group ID:</label>
                <input
                  type="text"
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
                  className="border rounded px-2 py-1"
                />
              </div>
            )}
            {viewMode === "teacher" && (
              <div className="mb-4">
                <label className="mr-2">Teacher ID:</label>
                <input
                  type="text"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className="border rounded px-2 py-1"
                />
              </div>
            )}
            <button
              onClick={fetchSchedules}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow mb-4"
            >
              Fetch Schedules
            </button>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <table className="w-full border-collapse border text-sm mt-4">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="border px-4 py-2">Group</th>
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Teacher</th>
                  <th className="border px-4 py-2">Day</th>
                  <th className="border px-4 py-2">Time</th>
                  <th className="border px-4 py-2">Room</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className="odd:bg-white even:bg-gray-100"
                  >
                    <td className="border px-4 py-2">
                      {schedule.Grupe?.name || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {schedule.Materii?.nume_materie || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {schedule.Profesori?.nume || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {schedule.weekDay || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {schedule.startHour}-
                      {schedule.startHour + schedule.duration || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {schedule.roomName || "N/A"}
                    </td>
                  </tr>
                ))}
                {schedules.length === 0 && !loading && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4 text-gray-500 dark:text-gray-300"
                    >
                      No schedules found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SchedulePage;
