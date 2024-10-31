import { useState } from "react";

export default function Categories({ categories, onAddCategory }) {
  const [category, setCategory] = useState("");
  const [showForm, setShowForm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onAddCategory(category);
    setCategory("");
  }
  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          <button>Add</button>
        </form>
      )}
      <button onClick={() => setShowForm((cur) => !cur)}>
        {showForm ? "Close" : "Add category"}
      </button>
    </div>
  );
}
