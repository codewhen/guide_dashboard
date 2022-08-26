import { Box, Button, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import styles from "../MapDetails.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { getBase64 } from "../../../core/base64";

export default function ItemTile({ onClose, onChange }) {
  const nameRef = useRef();
  const latRef = useRef();
  const lonRef = useRef();
  const descRef = useRef();
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    console.log("started");
    if (!e.target.files) {
      console.log("no file detected");
      //TODO toast
      return;
    }
    const fileT = e.target.files[0];
    const { name } = fileT;

    setFileName(name);
    console.log(fileT);
    getBase64(fileT, (result) => {
      setFile(result);
    });
    console.log(file);
    const itemname = nameRef.current.value;
    const lat = latRef.current.value;
    const lon = lonRef.current.value;
    const desc = descRef.current.value;
    onChange({ name: itemname, lat, lon, desc, image: file, fileName });
  };

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
          onChange({ name, lat, lon, desc, image: file, fileName });
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
          onChange({ name, lat, lon, desc, image: file, fileName });
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
          onChange({ name, lat, lon, desc, image: file, fileName });
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
          onChange({ name, lat, lon, desc, image: file, fileName });
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
      <Button
        sx={{
          margin: 2,
        }}
        component="label"
        variant="contained"
      >
        <input type="file" hidden onChange={onFileChange} />
        {!fileName ? "Add Image" : fileName}
      </Button>
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
