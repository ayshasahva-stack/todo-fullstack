import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodoById, toggleTodo, deleteTodo } from "../services/todo.api";

const TodoDetails = () => {

    const { id } = useParams();

    const [todo, setTodo] = useState(null);
    const [message, setMessage] = useState("");

    const fetchTodo = async () => {
        try {

            const response = await getTodoById(id);

            setTodo(response.data);

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Failed to fetch todo"
            );

        }
    };

    useEffect(() => {
        fetchTodo();
    }, [id]);

    if (message) {
        return <p>{message}</p>;
    }

    if (!todo) {
        return <p>Loading...</p>;
    }
    const handleToggle = async () => {

        try {

            const response = await toggleTodo(id);

            setTodo(response.data);

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Failed to update todo"
            );

        }
    };
    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this todo?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const response = await deleteTodo(id);

            setMessage(response.message);

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Failed to delete todo"
            );

        }
    };

    return (
        <div>

            <h1>{todo.title}</h1>

            <p>{todo.description}</p>

            <p>Priority: {todo.priority}</p>

            <p>
                Status: {todo.completed ? "Completed" : "Pending"}
            </p>
            <button onClick={handleToggle}>
                {todo.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
            <button onClick={handleDelete}>
                Delete Todo
            </button>
        </div>
    );
};

export default TodoDetails;