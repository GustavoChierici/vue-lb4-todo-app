<template>
  <div class="todo-list container">  
    <ul>
      <li class="todos" v-for="todo in todos" :key="todo.id">
        <TodoItem 
          :id="todo.id" 
          :name="todo.name" 
          :priority="todo.priority" 
          :isComplete="todo.isComplete"
          @deleteThisTodo="deleteTodo"
          @completeThisTodo="completeTodo"/>
      </li>
    </ul>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
  name: 'App',
  components: {
    TodoItem
  },
  props: {
      todos: {
          type: Array,
      },
  },
  methods: {
      deleteTodo(todo) {
      fetch(`http://localhost:3000/todos/${todo.id}`, {
        headers: {
          'Content-Type':'application/json'
        },
        method: 'DELETE',
      });
    },
    completeTodo(todo) {
      fetch(`http://localhost:3000/todos/${todo.id}`, {
        headers: {
          'Content-Type':'application/json'
        },
        method: 'PATCH',
        body: `{"isComplete":${!todo.isComplete}}`
      });
    }
  }
}
</script>

<style>
.todos {
  list-style: none;
  padding: 5px;
}
</style>
