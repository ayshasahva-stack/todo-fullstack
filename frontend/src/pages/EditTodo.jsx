import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoById, updateTodo } from "../services/todo.api";

const EditTodo = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "medium"
    });

    const [message, setMessage] = useState("");



    const fetchTodo = async () => {
        try {
            const response = await getTodoById(id);

            setFormData({
                title: response.data.title,
                description: response.data.description,
                priority: response.data.priority
            });

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to fetch todo"
            );
        }
    };

    useEffect(() => {
        fetchTodo();
    }, [id]);

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
            const response = await updateTodo(id, formData);
            navigate('/view-todo')
            setMessage(response.message);

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to update todo"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-xl mx-auto  ">

                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Edit Todo
                </h1>

                {message && (
                    <p className="mb-4 text-center text-green-600 font-medium">
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Priority
                        </label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Update Todo
                    </button>

                </form>

            </div>

        </div>
    );
};

export default EditTodo;