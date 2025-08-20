import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const TodoList = ({ initialTodos = [], onTodosChange }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (onTodosChange) {
      onTodosChange(todos);
    }
  }, [todos, onTodosChange]);

  // Add new todo
  const addTodo = useCallback(() => {
    if (newTodo.trim() === "") {
      alert("Please enter a todo item");
      return;
    }

    const todo = {
      id: Date.now() + Math.random(), // Simple ID generation
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos((prevTodos) => [...prevTodos, todo]);
    setNewTodo("");
  }, [newTodo]);

  // Toggle todo completion
  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  }, []);

  // Delete todo
  const deleteTodo = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  }, []);

  // Start editing
  const startEdit = useCallback((todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  }, []);

  // Save edit
  const saveEdit = useCallback(() => {
    if (editText.trim() === "") {
      alert("Todo text cannot be empty");
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editingId
          ? {
              ...todo,
              text: editText.trim(),
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );

    setEditingId(null);
    setEditText("");
  }, [editingId, editText]);

  // Cancel edit
  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditText("");
  }, []);

  // Clear completed todos
  const clearCompleted = useCallback(() => {
    const completedCount = todos.filter((todo) => todo.completed).length;
    if (completedCount === 0) {
      alert("No completed todos to clear");
      return;
    }

    if (window.confirm(`Clear ${completedCount} completed todo(s)?`)) {
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    }
  }, [todos]);

  // Toggle all todos
  const toggleAll = useCallback(() => {
    const allCompleted =
      todos.length > 0 && todos.every((todo) => todo.completed);
    const newCompletedState = !allCompleted;

    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        completed: newCompletedState,
        updatedAt: new Date().toISOString(),
      }))
    );
  }, [todos]);

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
    }
  });

  // Get todo statistics
  const stats = {
    total: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };

  // Handle key press for new todo input
  const handleNewTodoKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // Handle key press for edit input
  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <div className="todo-list">
      <h2>Todo List</h2>

      {/* Add new todo */}
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleNewTodoKeyPress}
          placeholder="What needs to be done?"
          className="new-todo-input"
        />
        <button onClick={addTodo} className="add-button">
          Add Todo
        </button>
      </div>

      {/* Todo controls */}
      {todos.length > 0 && (
        <div className="todo-controls">
          <button onClick={toggleAll} className="toggle-all">
            {todos.every((todo) => todo.completed)
              ? "Mark all as active"
              : "Mark all as completed"}
          </button>
          <button onClick={clearCompleted} className="clear-completed">
            Clear Completed ({stats.completed})
          </button>
        </div>
      )}

      {/* Filter buttons */}
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All ({stats.total})
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active ({stats.active})
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed ({stats.completed})
        </button>
      </div>

      {/* Todo list */}
      <ul className="todos">
        {filteredTodos.length === 0 ? (
          <li className="no-todos">
            {todos.length === 0
              ? "No todos yet. Add one above!"
              : `No ${filter} todos.`}
          </li>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              {editingId === todo.id ? (
                <div className="edit-todo">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={handleEditKeyPress}
                    onBlur={saveEdit}
                    autoFocus
                    className="edit-input"
                  />
                  <button onClick={saveEdit} className="save-button">
                    Save
                  </button>
                  <button onClick={cancelEdit} className="cancel-button">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="view-todo">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  <span
                    className="todo-text"
                    onDoubleClick={() => startEdit(todo)}
                    title="Double-click to edit"
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => startEdit(todo)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              )}
              <div className="todo-meta">
                Created: {new Date(todo.createdAt).toLocaleString()}
                {todo.updatedAt !== todo.createdAt && (
                  <span>
                    {" "}
                    | Updated: {new Date(todo.updatedAt).toLocaleString()}
                  </span>
                )}
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Statistics */}
      {todos.length > 0 && (
        <div className="stats">
          <p>
            Total: {stats.total} | Active: {stats.active} | Completed:{" "}
            {stats.completed}
          </p>
        </div>
      )}
    </div>
  );
};

TodoList.propTypes = {
  initialTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ),
  onTodosChange: PropTypes.func,
};

// Example usage component
const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const handleTodosChange = useCallback((newTodos) => {
    // Could save to localStorage, send to API, etc.
    console.log("Todos changed:", newTodos);
  }, []);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Error loading todos from localStorage:", error);
      }
    }
  }, []);

  // Save todos to localStorage when they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app">
      <TodoList initialTodos={todos} onTodosChange={handleTodosChange} />
    </div>
  );
};

export default TodoList;
export { TodoApp };
