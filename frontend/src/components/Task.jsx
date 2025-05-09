import React, { useState } from "react";

const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("token"));

    const taskData = {
      title,
      description,
      status,
      priority,
      userId: "user-id-goes-here",
    };

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Task created successfully!");
        setTitle("");
        setDescription("");
        setStatus("incomplete");
        setPriority("Low");
      } else {
        alert(data.message || "Error creating task");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-blue-500 font-bold text-center mt-8 text-3xl">
        Create Task
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[20%] relative gap-6 border rounded-xl border-gray-200 m-auto shadow shadow-lg mt-[5%] p-6"
      >
        <input
          type="title"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-md border-gray-300 p-2 text-sm text-gray-700 w-[90%]"
        />
        <textarea
          name="describtion"
          placeholder="Describtion"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-md border-gray-300 p-2 text-sm text-gray-700 w-[90%]"
        />
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-md border-gray-300 p-2 text-sm text-gray-700 w-[90%]"
        >
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>

        <select
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded-md border-gray-300 p-2 text-sm text-gray-700 w-[90%]"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Task;
