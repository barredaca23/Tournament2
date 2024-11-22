"use client";
import { useState } from "react";
import { useUser } from "../../context/usercontext";
import axios from 'axios';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser(); // Usamos el contexto del usuario

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      console.log('Login exitoso', response.data);
    } catch (error) {
      console.error('Error al hacer login', error);
      
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default LoginPage;

