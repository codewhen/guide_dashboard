import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import styles from "./Fab.module.css";
import { useNavigate } from "react-router-dom";

export default function FabButton() {
  const navigate = useNavigate();
  return (
    <Fab
      className={styles.fab}
      color="primary"
      aria-label="add"
      onClick={() => {
        navigate("/map");
      }}
    >
      <AddIcon />
    </Fab>
  );
}
