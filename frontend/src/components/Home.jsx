import React, { useState, useEffect } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);

    useEffect(() => {
      
        const fetchTasks = async () => {
          const token = JSON.parse(localStorage.getItem("token"));
      try {
         const response = await fetch("http://localhost:3000/api/tasks", {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });

        const data = await response.json();

        if (response.ok) {
          setTasks(data);
        } else {
          alert(data.message || "Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Something went wrong");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Tasks</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, i) => (
              <tr key={i} className="text-center">
                <td className="border px-4 py-2">{task.title}</td>
                <td className="border px-4 py-2">{task.description}</td>
                <td className="border px-4 py-2">{task.status}</td>
                <td className="border px-4 py-2">{task.priority}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
