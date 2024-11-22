"use client"; // Especifica que este componente es un componente cliente

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Para acceder a los parámetros de la URL
import axios from "axios";

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

const ProfilePage = () => {
  const { id: userId } = useParams(); // Obtiene el parámetro `id` desde la URL
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Llama a la API para obtener el perfil del usuario
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        console.error("ID de usuario no encontrado");
        return;
      }

      try {
        const response = await axios.get(`/api/profile/${userId}`);
        setProfile(response.data);
        setFormData({ name: response.data.name, email: response.data.email });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  // Maneja los cambios en los campos de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Llama a la API para actualizar el perfil
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`/api/profile/${userId}`, formData);
      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      {!isEditing ? (
        <div>
          <p>
            <strong>Nombre:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <button onClick={() => setIsEditing(true)}>Editar Perfil</button>
        </div>
      ) : (
        <div>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleUpdateProfile}>Guardar Cambios</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;



