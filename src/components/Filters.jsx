import React from "react";
import {
  Typography,
  Stack,
  FormLabel,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function Filters({ onSelectFilter }) {
  return (
    <Stack spacing={1}>
      <Typography variant="h4">Filters</Typography>
      <FormControl>
        <FormLabel>Filter by</FormLabel>
        <RadioGroup defaultValue="all" onChange={(e) => onSelectFilter(e.target.value)}>
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="past" control={<Radio />} label="Past 🕣" />
          <FormControlLabel value="today" control={<Radio />} label="Today 📆" />
          <FormControlLabel value="upcoming" control={<Radio />} label="Upcoming 🗓️" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
