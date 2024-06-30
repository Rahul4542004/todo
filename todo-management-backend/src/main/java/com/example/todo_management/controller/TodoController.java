package com.example.todo_management.controller;

import com.example.todo_management.dto.TodoDto;
import com.example.todo_management.service.TodoService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController
@CrossOrigin("*")
@RequestMapping("/api/todos")
@AllArgsConstructor
public class TodoController {
    TodoService todoService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todo){
        TodoDto todoDto = todoService.addTodo(todo);
        return new ResponseEntity<>(todoDto, HttpStatus.CREATED);
    }
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<TodoDto>> getAllTodos(){
        List<TodoDto> list = todoService.getAllTodos();
        return ResponseEntity.ok(list);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TodoDto> updateTodo(@RequestBody TodoDto todoDto,@PathVariable Long id){
        TodoDto updatedTodo = todoService.updateTodo(todoDto,id);
        return ResponseEntity.ok(updatedTodo);
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<TodoDto> getTodo(@PathVariable Long id){
        TodoDto todoDto = todoService.getTodoById(id);
        return ResponseEntity.ok(todoDto);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
        return ResponseEntity.ok("Todo with id : " + id + " deleted successfully");
    }
    @PatchMapping("/complete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<TodoDto> completeTodo(@PathVariable Long id){
        TodoDto todoDto = todoService.completeTodo(id);
        return ResponseEntity.ok(todoDto);
    }
    @PatchMapping("/incomplete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<TodoDto> incompleteTodo(@PathVariable Long id){
        TodoDto todoDto = todoService.incompleteTodo(id);
        return ResponseEntity.ok(todoDto);
    }
}
