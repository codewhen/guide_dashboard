import { Box, Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AppBar from "../dashboard/components/AppBar";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./MapDetails.module.css";

export default function MapDetail() {
  const [geojsons, setGeojsons] = useState([]);
  const [geojsonFiles, setGeojsonFiles] = useState([]);

  const handleFileChange = (e) => {
    console.log("run");
    if (!e.target.files) {
      console.log("no file detected");
      //TODO toast
      return;
    }
    const file = e.target.files[0];

    console.log(file);
    const { name } = file;

    setGeojsons((names) => [name, ...names]);

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;

      setGeojsonFiles((results) => [result, ...results]);
    };
    reader.readAsBinaryString(file);
  };
  return (
    <>
      <AppBar />
      <Container>
        <Box
          sx={{
            height: 28,
          }}
        />
        <Form>
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Museum Name"
            margin="normal"
          />
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Address"
            margin="normal"
          />

          <Box
            sx={{
              height: 20,
            }}
          />
          <Box
            sx={{
              minHeight: 100,
              border: "1px dashed grey",
              paddingTop: 3,
              paddingBottom: 3,
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {geojsons.map((e) => {
              return (
                <p key={e}>
                  {e}{" "}
                  <Button
                    onClick={() => {
                      const exisitingGeojsons = [...geojsons];
                      const index = exisitingGeojsons.indexOf(e);
                      if (index > -1) {
                        exisitingGeojsons.splice(index, 1);
                      }
                      setGeojsons(exisitingGeojsons);
                    }}
                  >
                    <CloseIcon />
                  </Button>
                </p>
              );
            })}
            <Button component="label" startIcon={<UploadIcon />}>
              Upload GEOJSON
              <input
                type="file"
                accept=".geojson"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Box>
          <Box
            sx={{
              height: 12,
            }}
          />
          <div className={styles.rowdiv}>
            <TextField
              required
              type="number"
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
              type="number"
              id="outlined-required"
              label="Longitude"
              margin="normal"
            />
          </div>

          <Box
            sx={{
              height: 18,
            }}
          />
          <div className={styles.rowdiv}>
            <Button variant="contained">Add Items</Button>
          </div>
          <Box
            sx={{
              height: 28,
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              height: 50,
            }}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
