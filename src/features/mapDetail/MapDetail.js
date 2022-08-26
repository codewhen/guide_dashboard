import { Box, Button, Container, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import AppBar from "../dashboard/components/AppBar";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./MapDetails.module.css";
import ItemTile from "./components/ItemTile";
import { Portal } from "react-portal";
import { baseUrl } from "../../core/config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MapDetail() {
  const [geojsons, setGeojsons] = useState([]);
  const [geojsonFiles, setGeojsonFiles] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [items, setItems] = useState([]);

  const museumNameRef = useRef(null);
  const addressRef = useRef(null);
  const latRef = useRef(null);
  const lonRef = useRef(null);
  const navigate = useNavigate();

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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const museumName = museumNameRef.current.value;
      const address = addressRef.current.value;
      const geojsons = geojsonFiles;
      const lat = latRef.current.value;
      const lon = lonRef.current.value;
      console.log(items);
      const response = await axios.post(
        `${baseUrl}/map/new`,
        {
          name: museumName,
          placeName: address,
          geojson: geojsons,
          lat: lat,
          lon: lon,
          items: items,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("secret_token")}`,
          },
        }
      );
      setisLoading(false);
      navigate("/");

      console.log(response);
    } catch (e) {
      console.log(e);
    }
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
        <Form onSubmit={onSubmit}>
          <TextField
            inputRef={museumNameRef}
            required
            fullWidth
            id="outlined-required"
            label="Museum Name"
            margin="normal"
          />
          <TextField
            inputRef={addressRef}
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
              Upload GEOJSON for maps
              <input
                type="file"
                accept=".geojson"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            <span
              style={{
                fontSize: 14,
                color: "grey",
              }}
            >
              * For creating geojson refer to{" "}
              <a href="https://www.qgis.org/en/site/forusers/download.html">
                download
              </a>
              /<a href={`${baseUrl}/doc/GUIDELINES.pdf`}>guideline</a>.
            </span>
          </Box>
          <Box
            sx={{
              height: 12,
            }}
          />
          <div className={styles.rowdiv}>
            <TextField
              inputRef={latRef}
              required
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
              inputRef={lonRef}
              required
              // type="number"
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
          {items.length > 0 && (
            <p
              style={{
                textAlign: "left",
                marginBottom: 0,
              }}
            >
              Items List
            </p>
          )}
          {items.map((e, i) => {
            return (
              <ItemTile
                key={i}
                onClose={() => {
                  setItems((items) => {
                    const exisitingItems = [...items];
                    exisitingItems.pop();
                    return exisitingItems;
                  });
                }}
                onChange={(item) => {
                  const existingItems = items;
                  existingItems[i] = item;
                  setItems(existingItems);
                  console.log(items);
                }}
              />
            );
          })}
          <div className={styles.rowdiv}>
            <Button
              variant="contained"
              onClick={() => {
                setItems((items) => {
                  const exisitingItems = [...items];
                  exisitingItems.push({});
                  return exisitingItems;
                });
              }}
            >
              Add Items
            </Button>
          </div>
          <Box
            sx={{
              height: 28,
            }}
          />
          <Button
            type="submit"
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
      <Portal node={document && document.getElementById("loader")}>
        {isLoading && (
          <div className="loader-context">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </Portal>
    </>
  );
}
