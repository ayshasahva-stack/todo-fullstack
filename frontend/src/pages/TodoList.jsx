import { useEffect, useState } from "react";
import { getTodos, toggleTodo, deleteTodo } from "../services/todo.api";
import { useNavigate } from "react-router-dom";

const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const fetchTodos = async () => {
        try {

            const response = await getTodos();

            setTodos(response.data);

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Failed to fetch todos"
            );

        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleToggle = async (id) => {

        try {

            await toggleTodo(id);

            fetchTodos();

        } catch (error) {

            setMessage(error.response?.data?.message || "Failed to update todo");

        }
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this todo?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteTodo(id);

            setTodos(todos.filter((todo) => todo._id !== id));

            setMessage("Todo deleted successfully");

        } catch (error) {

            setMessage(
                error.response?.data?.message || "Failed to delete todo"
            );

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    My Todos
                </h1>

                {message && (
                    <p className="text-center text-green-600 font-medium mb-6">
                        {message}
                    </p>
                )}

                {todos.length === 0 ? (

                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <p className="text-gray-500">
                            No todos found
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {todos.map((todo) => (

                            <div
                                key={todo._id}
                                className=" rounded-xl  p-6 hover:shadow-lg transition"
                            >

                                <h2 className="text-xl font-bold text-gray-800 mb-3">
                                    {todo.title}
                                </h2>

                                <p className="text-gray-600 mb-4">
                                    {todo.description}
                                </p>

                                <div className="flex justify-between items-center mb-4">

                                    <p className="text-sm text-gray-600">
                                        Priority:
                                        <span className="font-semibold ml-1">
                                            {todo.priority}
                                        </span>
                                    </p>

                                    <p
                                        className={`text-sm font-semibold ${todo.completed
                                                ? "text-green-600"
                                                : "text-orange-500"
                                            }`}
                                    >
                                        {todo.completed
                                            ? "Completed"
                                            : "Pending"
                                        }
                                    </p>

                                </div>

                                <div className="flex flex-wrap gap-2">

                                    <button
                                        onClick={() => handleToggle(todo._id)}
                                        className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                                    >
                                        {todo.completed
                                            ? "Mark as Pending"
                                            : "Complete"
                                        }
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate(`/todo/${todo._id}/edit`)
                                        }
                                        className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(todo._id)}
                                        className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default TodoList;