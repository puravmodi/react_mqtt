import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const Connection = ({ connect, disconnect, connectBtn }) => {
  const [values, setValues] = useState({
    host: "broker.emqx.io",
    port: 8083,
    clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
    username: "",
    password: "",
  });

  const onConnect = (values) => {
    const { host, clientId, port, username, password } = values;
    const url = `ws://${host}:${port}/mqtt`;
    const options = {
      keepalive: 30,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    };
    options.clientId = clientId;
    options.username = username;
    options.password = password;
    connect(url, options);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const ConnectionForm = (
    <form>
      <Grid container direction="row" alignItems="flex-start">
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Host"
            variant="outlined"
            size="small"
            value={values.host}
            style={{ padding: "0.7em" }}
            onChange={(e) =>
              setValues((prevState) => ({ ...prevState, host: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Port"
            variant="outlined"
            size="small"
            value={values.port}
            style={{ padding: "0.7em" }}
            onChange={(e) =>
              setValues((prevState) => ({ ...prevState, port: e.target.value }))
            }
          />
        </Grid>
      </Grid>
      <Grid container direction="row" alignItems="flex-start">
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Client ID"
            variant="outlined"
            size="small"
            value={values.clientId}
            style={{ padding: "0.7em" }}
            onChange={(e) =>
              setValues((prevState) => ({
                ...prevState,
                clientId: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>
      <Grid container direction="row" alignItems="flex-start">
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            size="small"
            value={values.username}
            style={{ padding: "0.7em" }}
            onChange={(e) =>
              setValues((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            value={values.password}
            style={{ padding: "0.7em" }}
            onChange={(e) =>
              setValues((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>
    </form>
  );

  return (
    <div>
      <h3 className="set-title">Connection</h3>
      {ConnectionForm}
      <div style={{ margin: "1em" }}>
        <Button
          variant="contained"
          onClick={() => onConnect(values)}
          style={{ marginRight: "1em" }}
        >
          {connectBtn}
        </Button>

        <Button variant="contained" color="error" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </div>
    </div>
  );
};

export default Connection;
