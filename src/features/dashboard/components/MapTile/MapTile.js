import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import MapIcon from "@mui/icons-material/Map";
import { Link } from "react-router-dom";

export default function MapTile({ label, id }) {
  return (
    <>
      <ListItemButton component={Link} to={`/map/${id}`}>
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </>
  );
}
