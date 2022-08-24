import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import styles from "./Fab.module.css";

export default function FabButton() {
  return (
    <Fab className={styles.fab} color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );
}
