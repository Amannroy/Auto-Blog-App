import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

// Setting baseURL for making the api call
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({children}) => {

    const navigate = useNavigate();

    const [token, setToken] = useState(null); // We will use this token for user authentication and we will store this tokem in browser local storage 
    const [blogs, setBlogs] = useState([]); // We will store all th blog data
    const [input, setInput] = useState(""); // We will filter the blog

    // Function to get the blog data from the database
    const fetchBlogs = async() => {
        try{
           const {data} = await axios.get('/api/blog/all');
           data.success ? setBlogs(data.blogs) : toast.error(data.message)
        }catch(error){
           toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token');
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`; // This token will be added to all the api call whenever the token is available(means whenever the admin is logged in)
        }
    }, [])

    const value = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput
    };

     return( 
        <AppContext.Provider value={value}>
             {children}
        </AppContext.Provider>
     )
}

// Whenever we have to use the data from the context we will simply call useAppContext function
export const useAppContext = ()=>{
    return useContext(AppContext)
};