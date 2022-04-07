import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";

const Receiver = ({ payload, subscribedTopic }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (payload.topic) {
      setMessages((messages) => [...messages, payload]);
    }
  }, [payload]);

  return (
    <div>
      <h3 className="set-title">Receiver</h3>
      {messages.map((m, index) => (
        <div key={index}>
          {subscribedTopic.includes(m.topic) && (
            <Card variant="outlined" className="set-title set-receiver">
              <p style={{ fontWeight: "700" }}>Topic = {m.topic}</p>
              <p>{m.message}</p>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export default Receiver;
