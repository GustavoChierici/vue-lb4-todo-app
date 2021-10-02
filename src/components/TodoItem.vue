<template>
  <div
    class="container todo"
    :class="completeTodo + ' todo-' + todoPriority.toLowerCase()"
  >
    <div class="row align-items-center">
      <div class="col-md-1 col-sm-1">
        <input
          type="checkbox"
          @click="this.$emit('completeThisTodo', this)"
          :checked="isComplete"
          title="Complete todo"
        />
      </div>
      <div class="todo-name col-md-6 col-sm-4">
        {{ name }}
      </div>
      <div class="col-md col-sm-1">Priority: {{ todoPriority }}</div>
      <div class="col-md col-sm-1">
        <button
          title="Delete todo"
          @click="deleteTodo"
          class="btn btn-outline danger"
        >
          <font-awesome-icon icon="trash-alt" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);
export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    id: Number,
    name: String,
    priority: Number,
    isComplete: Boolean,
  },
  data() {
    return {
      complete: this.isComplete,
    };
  },
  methods: {
    deleteTodo() {
      this.$emit("deleteThisTodo", this);
    },
  },
  computed: {
    completeTodo() {
      return this.isComplete ? "todo-complete" : "";
    },
    todoPriority() {
      if (this.priority >= 3) return "High";
      else if (this.priority == 2) return "Medium";
      else return "Low";
    },
  },
};
</script>

<style scoped>
.todo {
  padding: 10px;
  border-radius: 10px;
}

.btn {
  border-radius: 20px;
}

.todo-name {
  overflow-wrap: break-word;
}

.todo-high {
  color: white;
  background-color: rgb(231, 123, 123);
}

.todo-high .btn {
  color: white;
}

.todo-medium {
  background-color: rgb(255, 248, 155);
}

.todo-low {
  background-color: rgb(200, 255, 217);
}

.todo-complete {
  filter: opacity(0.5);
}
</style>
