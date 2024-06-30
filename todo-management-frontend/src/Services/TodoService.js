import axios from 'axios';
const REST_API_BASE_URL = "http://localhost:8085/api/todos"
const AUTH_URL = "http://localhost:8085/api/auth"
export const getTodoList = () => axios.get(REST_API_BASE_URL);
export const markComplete = (id) => axios.put(REST_API_BASE_URL + "/complete/" + id);
export const markIncomplete = (id) => axios.put(REST_API_BASE_URL + "/incomplete/" + id);
export const getTodo = (id) => axios.get(REST_API_BASE_URL + "/" + id);
export const updateTodo = (id,todo) => axios.put(REST_API_BASE_URL + "/" + id,todo);
export const deleteTodo = (id) => axios.delete(REST_API_BASE_URL + "/" + id);
export const addTodo = (todo) => axios.post(REST_API_BASE_URL,todo);
export const logIn = (user) => axios.post(AUTH_URL + "/login",user);