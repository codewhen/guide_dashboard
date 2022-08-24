import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import MapIcon from "@mui/icons-material/Map";

export default function MapTile({ label }) {
  return (
    <>
      <ListItemButton component="a" href="#simple-list">
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </>
  );
}
