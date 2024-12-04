"use client";
import { useState } from "react";
import { useUser } from "../../context/usercontext";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser(); // Usamos el contexto del usuario
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, user } = response.data; // El backend debe enviar el token y el usuario
      setUser({ ...user, token, role: user.role }); // Actualiza el contexto con el token y los datos del usuario
      localStorage.setItem('token', token); // Guarda el token en el almacenamiento local
      localStorage.setItem('userId', user.id); // Guarda el id del usuario en el almacenamiento local
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username);
      console.log('Login exitoso');
      // Aquí puedes redirigir al usuario a la página de admin
      if (user.role === 'admin') {
        router.push('/admin'); // Redirige a la página de admin
      }else{
        router.push(`/profile`);
      }
    } catch (error) {
      console.error('Error al hacer login', error);
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-blue-950">
        <div className="w-full max-w-md bg-blue-900 border-4 border-purple-500 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-purple-300 mb-6">
            Bienvenido
          </h1>
          <p className="text-center text-purple-400 mb-6">
            Ingresa tus credenciales para continuar
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            {errorMessage && (
                <div className="text-purple-300 text-sm p-3 bg-red-500 border border-red-700 rounded-md">
                  {errorMessage}
                </div>
            )}
            <div>
              <label
                  htmlFor="email"
                  className="block text-sm font-medium text-purple-300"
              >
                Correo electrónico
              </label>
              <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo"
                  autoComplete="email"
                  required
                  className="mt-2 block w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  required
                  className="mt-2 block w-full p-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-200"
            >
              Iniciar Sesión
            </button>
          </form>
          <p className="text-center text-purple-400 text-sm mt-4">
            ¿No tienes una cuenta?{" "}
            <a
                href="/register"
                className="text-purple-300 hover:text-purple-500 font-medium transition duration-200"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
  );
};


export default LoginPage;


