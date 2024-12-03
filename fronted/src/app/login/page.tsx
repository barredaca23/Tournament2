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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, user } = response.data; // El backend debe enviar el token y el usuario
      setUser({ ...user, token, role: user.role }); // Actualiza el contexto con el token y los datos del usuario
      localStorage.setItem('token', token); // Guarda el token en el almacenamiento local
      localStorage.setItem('userId', user.id); // Guarda el id del usuario en el almacenamiento local
      localStorage.setItem('role', user.role);
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
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email" // Agregar id
            name="email" // Agregar name
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            autoComplete="email" // Sugerir al navegador que este campo es para el email
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password" // Agregar id
            name="password" // Agregar name
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoComplete="current-password" // Sugerir al navegador que este campo es para la contraseña
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;


