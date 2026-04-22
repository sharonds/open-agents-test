"use client";

import { useState, useEffect, useRef } from "react";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch {
        // ignore malformed data
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, hydrated]);

  function addTodo(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text, done: false }]);
    setInput("");
    inputRef.current?.focus();
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-xl px-4 py-12">
        <h1 className="text-2xl font-semibold mb-6">Todos</h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new todo…"
            aria-label="New todo text"
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-gray-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors"
          >
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="text-sm text-gray-400">No todos yet. Add one above.</p>
        ) : (
          <ol className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 border border-gray-200 rounded px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  aria-label={`Mark "${todo.text}" as ${todo.done ? "undone" : "done"}`}
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <span
                  className={`flex-1 text-sm ${
                    todo.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete "${todo.text}"`}
                  className="text-gray-400 hover:text-black transition-colors text-base leading-none"
                >
                  ×
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}
