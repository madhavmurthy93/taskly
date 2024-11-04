import { useState } from "react";
import Categories from "./Categories";
import Filters from "./Filters";
import Tasks from "./Tasks";
import { Container } from "@mui/material";
import { Grid2, Stack, Typography } from "@mui/material";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleAddCategory(category) {
    setCategories((cur) => [...cur, category]);
  }

  function handleDeleteCategory(index) {
    setCategories((cur) => cur.filter((_, i) => i !== index));
  }

  function handleSelectFilter(value) {
    setFilter(value);
  }

  return (
    <Container maxWidth="md" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      <Stack spacing={8}>
        <header>
          <Typography variant="h2" style={{ textAlign: "center" }}>
            Taskly
          </Typography>
        </header>
        <main style={{ flexGrow: 1 }}>
          <Grid2 container spacing={2} style={{ flexGrow: 1 }}>
            <Grid2 size={4}>
              <Stack spacing={2}>
                <Filters onSelectFilter={handleSelectFilter} />
                <Categories
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
              </Stack>
            </Grid2>
            <Grid2 size={8}>
              <Tasks categories={categories} filter={filter} />
            </Grid2>
          </Grid2>
        </main>
        <footer>
          <Typography variant="body1" style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} Taskly. All rights reserved.
          </Typography>
        </footer>
      </Stack>
    </Container>
  );
}
