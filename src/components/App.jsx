import { useState } from "react";
import Categories from "./Categories";
import Filters from "./Filters";
import Tasks from "./Tasks";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleAddCategory(category) {
    setCategories((cur) => [...cur, category]);
  }

  function handleSelectFilter(value) {
    console.log(value);
    setFilter(value);
  }

  return (
    <div className="app">
      <header>
        <h1>Taskly</h1>
      </header>
      <main>
        <div className="sidebar">
          <Filters onSelectFilter={handleSelectFilter} />
          <Categories categories={categories} onAddCategory={handleAddCategory} />
        </div>
        <Tasks categories={categories} filter={filter} />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Taskly. All rights reserved.</p>
      </footer>
    </div>
  );
}
