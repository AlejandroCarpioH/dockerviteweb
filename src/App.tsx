// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
// import { getApi } from "./api/getData";

// interface data {
//   completed: boolean;
//   id: number;
//   title: string;
//   userId: number;
// }

function App() {
  const [value, setValue] = useState("");
  const [audio, setAudio] = useState<File | null>(null);

  const handleFetch = async () => {
    const formData = new FormData();
    if (!audio) return;
    formData.append("audio", audio);
    const response = await fetch("https://acarpio.dev/audioToText", {
      method: "POST",
      // mode: "no-cors",
      body: formData,
    });
    console.log(response);
    if (!response.ok) return;
    const result = (await response.json()) as { message: string };
    setValue(result.message);

    console.log(result);
  };

  return (
    <>
      <div className="container">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            if (!e.target.files) return;
            setAudio(e.target.files[0]);
          }}
        />
        <button onClick={handleFetch}>enviar</button>
        <textarea
          value={`
          ${value}
            `}
          readOnly
          style={{ height: 100, resize: "none" }}
        />
        {/* <input
          style={{ height: 200 }}
          type="text"
          value={"hola como estas "}
          readOnly
          placeholder="respuesta..."
        /> */}
      </div>
    </>
  );
}

export default App;
