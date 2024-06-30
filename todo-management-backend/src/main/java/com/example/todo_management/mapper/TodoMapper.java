package com.example.todo_management.mapper;

import com.example.todo_management.dto.TodoDto;
import com.example.todo_management.entity.Todo;

public class TodoMapper {
    public static Todo mapToTodo(TodoDto todoDto){
        return new Todo(
                todoDto.getId(),
                todoDto.getTitle(),
                todoDto.getDescription(),
                todoDto.getCompleted()
        );
    }
    public static TodoDto mapToTodoDto(Todo todo){
        return new TodoDto(todo.getId(),todo.getTitle(),todo.getDescription(),todo.getCompleted());
    }
}
