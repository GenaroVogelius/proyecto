import React, { useState } from "react";

import Button from "./components/Button/Button";
import Pin from "./components/Pin/Pin";
import Typewriter from "./components/TypeWritter/TypeWritter";

function App() {
  const [count, setCount] = useState(0);

  const words = [
    { text: "Vite", className: "text-[#a95eff]" },
    { text: " + " },
    { text: "React", className: "text-[#61dafb]" },
    { text: " + " },
    { text: "Tailwindcss", className: "text-[#0ea5e9]" },
    { text: " + " },
    { text: "Framer Motion", className: "text-[#ff57c8]" },
  ];

  return (
    <div className="text-center">
      <header className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#282c34] pb-8 text-white">
        <Pin text="React 👍">
          <h1>hi</h1>
        </Pin>

        <Typewriter words={words} />
        <p className="my-10">
          <Button onTap={() => setCount((count) => count + 1)}>
            count is: {count}
          </Button>
        </p>
        <p>
          Edit <code className="text-[#8d96a7]">App.tsx</code> and save to test
          HMR updates.
        </p>
        <p className="mt-3 flex gap-3 text-center text-[#8d96a7]">
          <a
            className="text-[#61dafb] transition-all hover:text-blue-500"
            href="https://react.dev/learn"
            target="_blank"
            rel="noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="text-[#61dafb] transition-all hover:text-blue-500"
            href="https://vitejs.dev/guide/"
            target="_blank"
            rel="noreferrer"
          >
            Vite Docs
          </a>
          {" | "}
          <a
            className="text-[#61dafb] transition-all hover:text-blue-500"
            href="https://tailwindcss.com/docs/installation"
            target="_blank"
            rel="noreferrer"
          >
            Tailwindcss Docs
          </a>
          {" | "}
          <a
            className="text-[#61dafb] transition-all hover:text-blue-500"
            href="https://www.framer.com/motion/"
            target="_blank"
            rel="noreferrer"
          >
            Framer Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;