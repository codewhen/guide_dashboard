import { Box, Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import styles from "../MapDetails.module.css";
import CloseIcon from "@mui/icons-material/Close";

export default function ItemTile({ onClose, onChange }) {
  const nameRef = useRef();
  const latRef = useRef();
  const lonRef = useRef();
  const descRef = useRef();

  return (
    <div className={styles.rowdiv}>
      <TextField
        required
        inputRef={nameRef}
        onChange={() => {
          const name = nameRef.current.value;
          const lat = latRef.current.value;
          const lon = lonRef.current.value;
          const desc = descRef.current.value;
          onChange({ name, lat, lon, desc });
        }}
        id="outlined-required"
        label="Items Name"
        margin="normal"
      />
      <Box
        sx={{
          width: 8,
        }}
      />
      <TextField
        required
        inputRef={latRef}
        onChange={() => {
          const name = nameRef.current.value;
          const lat = latRef.current.value;
          const lon = lonRef.current.value;
          const desc = descRef.current.value;
          onChange({ name, lat, lon, desc });
        }}
        // type="number"
        id="outlined-required"
        label="Latitude"
        margin="normal"
      />
      <Box
        sx={{
          width: 8,
        }}
      />
      <TextField
        required
        inputRef={lonRef}
        onChange={() => {
          const name = nameRef.current.value;
          const lat = latRef.current.value;
          const lon = lonRef.current.value;
          const desc = descRef.current.value;
          onChange({ name, lat, lon, desc });
        }}
        // type="number"
        id="outlined-required"
        label="Longitude"
        margin="normal"
      />
      <Box
        sx={{
          width: 8,
        }}
      />
      <TextField
        required
        inputRef={descRef}
        onChange={() => {
          const name = nameRef.current.value;
          const lat = latRef.current.value;
          const lon = lonRef.current.value;
          const desc = descRef.current.value;
          onChange({ name, lat, lon, desc });
        }}
        // type="number"
        id="outlined-required"
        label="Description"
        margin="normal"
      />
      <Box
        sx={{
          width: 8,
        }}
      />
      <Button onClick={onClose}>
        <CloseIcon />
      </Button>
    </div>
  );
}
