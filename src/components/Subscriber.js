import {
  Button,
  Card,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useEffect, useState } from "react";
import { QosOption } from "./index";

const Subscriber = ({ sub, unSub, getsubscribedTopic, connectStatus }) => {
  const qosOptions = useContext(QosOption);
  const [values, setValues] = useState({
    topic: "testtopic/react",
    qos: 0,
  });
  const [subscribedTopic, setSubscribedTopic] = useState([]);

  useEffect(() => {
    getsubscribedTopic(subscribedTopic);
  }, [getsubscribedTopic, subscribedTopic]);

  const onSubscribe = (values) => {
    sub(values);
    setSubscribedTopic([...subscribedTopic, values.topic]);
  };

  const handleUnsub = (topic) => {
    const newArr = subscribedTopic.filter((item) => item !== topic);
    setSubscribedTopic(newArr);
    unSub(topic);
  };

  const SubForm = (
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
      <Grid className="set-padding">
        <Button
          variant="contained"
          disabled={!(connectStatus === "Connected")}
          onClick={() => onSubscribe(values)}
        >
          SubScribe
        </Button>
      </Grid>

      {subscribedTopic.length > 0
        ? subscribedTopic.map((topic, index) => (
            <Card
              key={index}
              variant="outlined"
              className="set-padding set-margin"
            >
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <p style={{ fontWeight: "700" }}>{topic}</p>
                </Grid>
                <Grid item xs={2}>
                  <CloseIcon
                    style={{ cursor: "pointer" }}
                    fontSize="small"
                    onClick={() => handleUnsub(topic)}
                  />
                </Grid>
              </Grid>
            </Card>
          ))
        : null}
    </>
  );

  return (
    <div>
      <h3 className="set-title">Subscriptions</h3>
      {SubForm}
    </div>
  );
};

export default Subscriber;
