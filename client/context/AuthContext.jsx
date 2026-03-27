import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  // Fixed typo: AuthProider -> AuthProvider

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [socket, setSocket] = useState(null);

    //Check if user is authenticated and if so, set the user data and connect the socket
    const checkAuth = async () => {
        try {
            const { data } = await axios.get("/api/auth/check");  // Fixed: /get/auth/check -> /api/auth/check
            if (data.success) {
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    //Login function to handle user authentication and socket connection
    const login = async (state, credentials) => {
        try {
            const { data } = await axios.post(`/api/auth/${state}`, credentials);
            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
                axios.defaults.headers.common["token"] = data.token;  // Fixed: [""] -> ["token"]
                setToken(data.token);
                localStorage.setItem("token", data.token);
                toast.success(data.message);
            } else {
                toast.error(data.message);  // Fixed: error.message -> data.message
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // logout function to handle user logout and socket disconnection
// logout function to handle user logout and socket disconnection
const logout = async () => {
    try {
        // Disconnect socket FIRST to trigger backend disconnect event
        if (socket) {
            socket.disconnect();
        }
        
        // Clear local state
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUser([]);
        axios.defaults.headers.common["token"] = null;
        
        toast.success("Logged out successfully");
    } catch (error) {
        console.error("Logout error:", error);
    }
}

    //update profile function to handle user profile updates
    const updateProfile = async (body) => {
        try {
            const { data } = await axios.put("/api/auth/update-profile", body);
            if (data.success) {
                setAuthUser(data.user);
                toast.success("Profile updated successfully");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //connect socket function to handle socket connection and online users updates
    const connectSocket = (userData) => {
        if (!userData || socket?.connected) return;  // Fixed: conneted -> connected
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUser(userIds);
        })
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth();
    }, [])

    const value = {
        axios,
        authUser,
        onlineUser,
        socket,
        login,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}