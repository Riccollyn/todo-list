import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-400">
      <div className="bg-white shadow-lg rounded-3xl p-16 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          REACT TODO LIST
        </h1>

        <div className="mb-4 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a new todo"
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1 rounded-full ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-1 rounded-full ${
              filter === "active"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-1 rounded-full ${
              filter === "completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Completed
          </button>
        </div>

        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id
                        ? { ...t, completed: !t.completed }
                        : t
                    )
                  )
                }
                className="mr-2 h-5 w-5 text-blue-600"
              />

              {editId === todo.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow px-2 py-1 border rounded focus:outline-none"
                />
              ) : (
                <span
                  className={`flex-grow ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>
              )}

              {editId === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="ml-2 border-none p-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditId(todo.id);
                    setEditText(todo.text);
                  }}
                  className="ml-2 border-none p-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() =>
                  setTodos(todos.filter((t) => t.id !== todo.id))
                }
                className="ml-2 border-none p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
