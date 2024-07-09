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

export const register = (user) => axios.post(AUTH_URL + "/register",user);

export const setToken = (token) => localStorage.setItem("token",token);

const getToken = () => localStorage.getItem("token");
axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const saveLoggedInUser = (username) => sessionStorage.setItem("authorizedUser",username);

export const isUserLoggedIn = () => {
  const user = sessionStorage.getItem("authorizedUser");
  return user !== null;
}

export const getLoggedInUser = () => sessionStorage.getItem("authorizedUser")

export const logout = () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location.reload(false);
}

export const getUsername = () => axios.get(AUTH_URL + "/username");