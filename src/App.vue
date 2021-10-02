<template>
  <div class="container">
    <h2>Simple ToDo List</h2>
    <div class="create-todo d-flex justify-content-center">
      <input
        type="text"
        placeholder="ToDo name"
        v-model="newTodo.name"
        style="border-radius: 10px 0 0 10px"
      />
      <select v-model="newTodo.priority" class="rounded-0">
        <option value="3">High</option>
        <option value="2">Medium</option>
        <option value="1">Low</option>
      </select>
      <button
        class="btn btn-outline-primary"
        @click="storeTodo"
        style="border-radius: 0 10px 10px 0"
      >
        Create
      </button>
    </div>

    <TodoList :todos="todos" />

    <div class="justify-content-center">
      Favicon made by:
      <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoList,
  },
  data() {
    return {
      todos: [],
      newTodo: {
        name: "",
        priority: 1,
      },
    };
  },
  created() {
    this.getTodos();
  },
  updated() {
    this.getTodos();
  },
  methods: {
    getTodos() {
      fetch("http://localhost:3000/todos/")
        .then((res) => res.json())
        .then((res) => {
          res.sort(function (lhs, rhs) {
            return rhs.isComplete
              ? -1
              : lhs.isComplete
              ? 1
              : rhs.priority - lhs.priority;
          });
          this.todos = res;
        });
    },
    storeTodo() {
      this.newTodo.priority = parseInt(this.newTodo.priority);
      fetch("http://localhost:3000/todos/", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(this.newTodo),
      }).then((res) => res.json());
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.create-todo {
  padding: 10px;
}

.todos {
  list-style: none;
  padding: 5px;
}
</style>
