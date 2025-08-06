import React, { useState } from "react";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);
const App: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-neutral-950">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Nebula Studios FiveM React Boilerplate
      </h1>
      <p className="text-lg text-white mb-6">
        This is a basic React app for FiveM using Vite. Edit{" "}
        <span className="text-violet-600 font-bold">App.tsx</span> to get
        started.
      </p>
    </div>
  );
};

export default App;
