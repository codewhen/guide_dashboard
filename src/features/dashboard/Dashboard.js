import { Fab, ListItemButton, ListItemText } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "./components/AppBar";
import FabButton from "./components/Fab/Fab";
import MapTile from "./components/MapTile/MapTile";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("secret_token")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  return (
    <div>
      <AppBar />
      <FabButton />
      {["map", "new map", "new new map"].map((e) => {
        return <MapTile label={e} />;
      })}
    </div>
  );
}
