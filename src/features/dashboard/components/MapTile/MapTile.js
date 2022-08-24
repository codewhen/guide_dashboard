import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import MapIcon from "@mui/icons-material/Map";
import { Link } from "react-router-dom";

export default function MapTile({ label }) {
  return (
    <>
      <ListItemButton component={Link} to="/simple-list">
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </>
  );
}
