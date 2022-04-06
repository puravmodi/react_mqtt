import React, { createContext, useEffect, useState } from "react";
import Connection from "./Connection";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";
import Receiver from "./Receiver";
import mqtt from "mqtt/dist/mqtt";
import { Grid } from "@mui/material";

export const QosOption = createContext([]);
const qosOption = [
  {
    label: "0",
    value: 0,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
];

const HookMqtt = () => {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [subscribedTopic, setSubscribedTopic] = useState([]);

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect(host, mqttOption));
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus("Connect");
      });
    }
  };

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        setIsSub(true);
      });
    }
  };

  const getsubscribedTopic = (topic) => {
    setSubscribedTopic(topic);
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      client.unsubscribe(subscription, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        setIsSub(false);
      });
    }
  };

  return (
    <>
      <Grid container spacing={{ xs: 0, sm: 0, md: 2 }} columns={16}>
        <Grid item md={4} sm={12} xs={12} container>
          <Connection
            connect={mqttConnect}
            disconnect={mqttDisconnect}
            connectBtn={connectStatus}
          />
        </Grid>
        <Grid item md={8} container>
          <Grid container spacing={1}>
            <QosOption.Provider value={qosOption}>
              <Grid item md={7} sm={6} xs={6}>
                <Publisher
                  publish={mqttPublish}
                  connectStatus={connectStatus}
                />
                <Grid item md={12} sm={12} xs={12}>
                  <Receiver
                    payload={payload}
                    subscribedTopic={subscribedTopic}
                  />
                </Grid>
              </Grid>
              <Grid item md={5} sm={6} xs={6}>
                <Subscriber
                  sub={mqttSub}
                  unSub={mqttUnSub}
                  showUnsub={isSubed}
                  connectStatus={connectStatus}
                  getsubscribedTopic={getsubscribedTopic}
                />
              </Grid>
            </QosOption.Provider>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HookMqtt;
