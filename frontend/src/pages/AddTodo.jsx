import { useState } from "react";
import { createTodo } from "../services/todo.api";

const AddTodo = () => {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "medium"
    });

    const [message, setMessage] = useState("");

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

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Failed to create todo"
            );

        }
    };

    return (
        <div>

            <h1>Add Todo</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Enter description"
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
                    Add Todo
                </button>

            </form>

        </div>
    );
};

export default AddTodo;