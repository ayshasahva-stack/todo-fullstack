import api from "./api";

export const createTodo = async (todoData) => {
    const response = await api.post("/todo", todoData);

    return response.data;
};

export const getTodos = async () => {
    const response = await api.get("/todo");

    return response.data;
};
export const getTodoById = async (id) => {
    const response = await api.get(`/todo/${id}`);

    return response.data;
};
export const updateTodo = async (id, todoData) => {
    const response = await api.put(`/todo/${id}`, todoData);

    return response.data;
};
export const toggleTodo = async (id) => {
    const response = await api.patch(`/todo/${id}`);

    return response.data;
};
export const deleteTodo = async (id) => {
    const response = await api.delete(`/todo/${id}`);

    return response.data;
};