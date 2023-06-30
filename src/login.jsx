import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,  // Agrega esta línea para permitir el envío de cookies en las solicitudes CORS
  });

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [sal, setSal] = useState("");


    const handleLogin = async (e) => {

        e.preventDefault();
        try {
            const response = await axiosInstance.post("/login", {
                username,
                password,
              });
            setError('Accedio');
            console.log(error);
            const { token, Username } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('Username', Username);
            navigate("/welcome", { state: { username: Username } });
        } catch (error) {
            setError('Error en la autenticacion');
            console.log(error);
        }
    };

    const ListarSaludo = async() => {
        const response = await axios.get('http://localhost:8080/hello');
        setSal(response.data);
    }

    useEffect(()=>{
        ListarSaludo();
        console.log(sal);
    },[ListarSaludo, sal]);
 
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Ingresa el usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password1"
                    placeholder="Ingresa la contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar Sesison</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}