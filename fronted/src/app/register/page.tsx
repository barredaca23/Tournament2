"use client";

import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/register", { username, email, password });
            setSuccess("Registro exitoso");
            setError("");
        } catch (err: any) {
            setError(err.response?.data?.message || "Error en el registro");
            setSuccess("");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-950">
            <div className="w-full max-w-md bg-blue-900 border-4 border-purple-500 rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-purple-300 mb-6">
                    Registrarse
                </h1>
                {success && (
                    <p className="text-green-500 text-center font-medium mb-4">
                        {success}
                    </p>
                )}
                {error && (
                    <p className="text-red-500 text-center font-medium mb-4">{error}</p>
                )}
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-purple-300"
                        >
                            Nombre de usuario
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Ingresa tu nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 block w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-purple-300"
                        >
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 block w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-purple-300"
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 block w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;