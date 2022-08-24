import { Fab, ListItemButton, ListItemText } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../core/config/config";
import AppBar from "./components/AppBar";
import FabButton from "./components/Fab/Fab";
import MapTile from "./components/MapTile/MapTile";

export default function Dashboard() {
  const navigate = useNavigate();
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("secret_token")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  useEffect(() => {
    getMaps();
  }, []);

  const getMaps = async () => {
    try {
      const response = await axios.get(`${baseUrl}/map/org/all`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("secret_token")}`,
        },
      });
      console.log(response);

      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }

      setMaps(response.data.maps);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AppBar />
      <FabButton />
      {maps.map((e) => {
        return <MapTile key={e["_id"]} label={e["name"]} />;
      })}
    </div>
  );
}
