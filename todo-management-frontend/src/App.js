import {Header} from './Components/Header.js';
import { TodoList } from './Components/TodoList.js';
import { Todo } from './Components/Todo.js';
import {BrowserRouter, Route,Routes,Navigate} from 'react-router-dom';
import { Register } from './Components/Register.js';
import { Login } from './Components/Login.js';
import { isUserLoggedIn } from './Services/TodoService.js';
function App() {
  function AuthenticatedRoute({children}){
    const isAuth = isUserLoggedIn();
    if(isAuth){
      return children;
    }
    else
      return <Navigate to="/login"/>
  }
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<TodoList/>}></Route>
          <Route path="/todos" element={<TodoList/>}></Route>
          <Route path="/add-todo" element={<AuthenticatedRoute>
            <Todo/>
          </AuthenticatedRoute>}></Route>
          
          <Route path="/update-todo/:id" element={<Todo/>}></Route>
          <Route path="/register" element = {<Register/>}></Route>
          <Route path='/login' element = {<Login/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
