package com.example.todo_management.service.impl;

import com.example.todo_management.dto.TodoDto;
import com.example.todo_management.entity.Todo;
import com.example.todo_management.exception.TodoNotFoundException;
import com.example.todo_management.mapper.TodoMapper;
import com.example.todo_management.repository.TodoRepository;
import com.example.todo_management.service.TodoService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {
    TodoRepository todoRepository;
    public TodoServiceImpl(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }
    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        Todo todo = TodoMapper.mapToTodo(todoDto);
        Todo savedTodo = todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(savedTodo);
    }

    @Override
    public List<TodoDto> getAllTodos() {
        List<TodoDto> list = new ArrayList<>();
        List<Todo> result = todoRepository.findAll();
        for(Todo todo : result){
            list.add(TodoMapper.mapToTodoDto(todo));
        }
        return list;
    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException("Todo with id : " + id + " doesn't exist"));
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.getCompleted());
        todo.setTitle(todoDto.getTitle());
        Todo updatedTodo = todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(updatedTodo);
    }

    @Override
    public TodoDto getTodoById(Long id) {
       Todo todo = todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException("Todo with id : " + id + " doesn't exist"));
       return TodoMapper.mapToTodoDto(todo);
    }

    @Override
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException("Todo with id : " + id + " doesn't exist"));
        todo.setCompleted(true);
        Todo completedTodo = todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(completedTodo);
    }

    @Override
    public TodoDto incompleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new TodoNotFoundException("Todo with id : " + id + " doesn't exist"));
        todo.setCompleted(false);
        Todo completedTodo = todoRepository.save(todo);
        return TodoMapper.mapToTodoDto(completedTodo);
    }
}
