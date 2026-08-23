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

            setMessage(response.message);

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Failed to update todo"
            );
        }
    };

    return (
        <div>

            <h1>Edit Todo</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button type="submit">
                    Update Todo
                </button>

            </form>

        </div>
    );
};

export default EditTodo;