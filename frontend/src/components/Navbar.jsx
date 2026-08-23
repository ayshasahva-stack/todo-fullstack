import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }


    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">

            <h2 className="text-2xl font-bold">
                Todo App
            </h2>

            <div className="flex items-center gap-6">

                <Link
                    to="/view-todo"
                    className="text-gray-300 hover:text-white transition"
                >
                    Todos
                </Link>

                <Link
                    to="/add-todo"
                   className="text-gray-300 hover:text-white transition"
                >
                    Add Todo
                </Link>
                <button onClick={handleLogout}
                className="bg-red-600  px-4 py-2 rounded-lg hover:bg-red-700 transition">
                    Logout
                </button>

            </div>

        </nav>
    );
};

export default Navbar;