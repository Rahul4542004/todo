import {Header} from './Components/Header.js';
import { TodoList } from './Components/TodoList.js';
import { Todo } from './Components/Todo.js';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import { Register } from './Components/Register.js';
import { Login } from './Components/Login.js';
function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<TodoList/>}></Route>
          <Route path="/todos" element={<TodoList/>}></Route>
          <Route path="/add-todo" element={<Todo/>}></Route>
          <Route path="/update-todo/:id" element={<Todo/>}></Route>
          <Route path="/register" element = {<Register/>}></Route>
          <Route path='/login' element = {<Login/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
