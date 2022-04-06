import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { QosOption } from "./index";

const Publisher = ({ publish, connectStatus }) => {
  const qosOptions = useContext(QosOption);
  const [values, setValues] = useState({
    topic: "testtopic/react",
    payload: "",
    qos: 0,
  });

  const onPublish = (values) => {
    publish(values);
  };

  const PublishForm = (
    <>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        spacing={2}
        className="set-padding"
      >
        <Grid item xs={7}>
          <TextField
            id="outlined-basic"
            label="Topic"
            autoComplete="off"
            variant="outlined"
            size="small"
            style={{ width: "100%" }}
            value={values.topic}
            onChange={(e) =>
              setValues((prevState) => ({
                ...prevState,
                topic: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Qos</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="QoS"
              value={values.qos}
              onChange={(e) =>
                setValues((prevState) => ({
                  ...prevState,
                  qos: e.target.value,
                }))
              }
            >
              {qosOptions.map((qos) => (
                <MenuItem key={qos.value} value={qos.value}>
                  {qos.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        className="set-padding"
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Message"
          multiline
          maxRows={5}
          style={{ width: "92%" }}
          value={values.payload}
          onChange={(e) =>
            setValues((prevState) => ({
              ...prevState,
              payload: e.target.value,
            }))
          }
        />
      </Grid>
      <Grid className="set-padding">
        <Button
          variant="contained"
          disabled={!(connectStatus === "Connected")}
          onClick={() => onPublish(values)}
        >
          Publish
        </Button>
      </Grid>
    </>
  );

  return (
    <div>
      <h3 className="set-title">Publish</h3>
      {PublishForm}
    </div>
  );
};

export default Publisher;
