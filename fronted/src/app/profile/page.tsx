"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "../../context/usercontext";
import { useRouter } from "next/navigation";
import axios from "axios";
import {GamepadIcon, TrophyIcon} from "lucide-react";

const ProfilePage = () => {
    const [tournamentsCount, setTournamentsCount] = useState<number | null>(null);
    const [gamesCount, setGamesCount] = useState<number | null>(null);
    const { user, setUser } = useUser(); // Obtén el usuario del contexto
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Manejar el estado de carga

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!user || !user.token) {
                    const token = localStorage.getItem("token");

                    if (!token) {
                        router.push("/login"); // Redirige al login si no hay token
                        return;
                    }

                    const response = await axios.get("http://localhost:5000/api/users/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setUser({ ...response.data, token });
                }
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener el perfil", error);
                router.push("/login");
            }
        };

        fetchProfile();
    }, [user, setUser, router]);

    const handleLogout = () => {
        setUser(null); // Elimina el usuario del contexto
        localStorage.removeItem("token"); // Elimina el token del almacenamiento local
        localStorage.removeItem("userId"); // Elimina el ID del usuario
        router.push("/login"); // Redirige al usuario al login
    };

    if (loading) return <div>Cargando perfil...</div>;

    if (!user) return <div>Error: No se encontró información del usuario.</div>;

    return (
        <div>
            <h1>Perfil del Usuario</h1>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.role}</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Torneos Activos</CardTitle>
                        <TrophyIcon className="h-4 w-4 text-purple-400"/>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="text-2xl font-bold">{tournamentsCount !== null ? tournamentsCount : 'Cargando...'}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Juegos Registrados</CardTitle>
                        <GamepadIcon className="h-4 w-4 text-purple-400"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{gamesCount !== null ? gamesCount : 'Cargando...'}</div>
                    </CardContent>
                </Card>
                {/* Agrega más cards si es necesario */}
            </div>
            <button onClick={handleLogout} style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px"
            }}>
                Cerrar Sesión
            </button>
        </div>
    );
};

export default ProfilePage;
