import { useState } from "react";
import { createTodo } from "../services/todo.api";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "medium"
    });

    const [message, setMessage] = useState("");
    const navigate=useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await createTodo(formData);

            setMessage(response.message);

            setFormData({
                title: "",
                description: "",
                priority: "medium"
            });
            navigate('/view-todo')

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Failed to create todo"
            );

        }
    };

    return (
      <div className="min-h-screen bg-slate-100 py-10 px-4">

    <div className="max-w-lg mx-auto">

        <h1 className="text-2xl font-semibold text-slate-800 mb-6">
            Add Todo
        </h1>

        {message && (
            <p className="mb-4 text-emerald-600 text-sm font-medium">
                {message}
            </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Title
                </label>

                <input
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-slate-300 px-3 py-2 rounded-md bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                </label>

                <textarea
                    name="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-slate-300 px-3 py-2 rounded-md bg-slate-50 text-slate-800 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Priority
                </label>

                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full border border-slate-300 px-3 py-2 rounded-md bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
            >
                Add Todo
            </button>

        </form>

    </div>

</div>
    );
};

export default AddTodo;