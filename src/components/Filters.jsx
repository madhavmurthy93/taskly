export default function Filters({ onSelectFilter }) {
  return (
    <div className="filters">
      <ul>
        <li style={{ cursor: "pointer" }} onClick={() => onSelectFilter("all")}>
          All
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => onSelectFilter("past")}>
          Past 🕣
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => onSelectFilter("today")}>
          Today 📆
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => onSelectFilter("upcoming")}>
          Upcoming 🗓️
        </li>
      </ul>
    </div>
  );
}
