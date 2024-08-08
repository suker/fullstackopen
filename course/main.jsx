import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App.jsx";

const notes = [
    {
      id: 1,
      content: 'HTML is easy',
      important: true
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      important: true
    }
  ]

const root = createRoot(document.getElementById("root"));
root.render(<App notes={notes}/>);
