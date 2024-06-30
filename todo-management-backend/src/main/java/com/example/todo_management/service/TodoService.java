package com.example.todo_management.service;

import com.example.todo_management.dto.TodoDto;
import java.util.*;
public interface TodoService {
    TodoDto addTodo(TodoDto todoDto);
    List<TodoDto> getAllTodos();
    TodoDto updateTodo(TodoDto todoDto,Long id);
    TodoDto getTodoById(Long id);
    void deleteTodo(Long id);
    TodoDto completeTodo(Long id);
    TodoDto incompleteTodo(Long id);
}
