import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Categories({ categories, onAddCategory, onDeleteCategory }) {
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddCategory(category);
    setCategory("");
  }
  return (
    <Stack spacing={1}>
      <Typography variant="h4">Categories</Typography>
      <List>
        {categories.map((category, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => onDeleteCategory(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <TagIcon />
            </ListItemIcon>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "flex-start" }}
      >
        <TextField
          label="Category"
          variant="outlined"
          size="small"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button type="submit" variant="outlined">
          Add
        </Button>
      </Box>
    </Stack>
  );
}
