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
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState<File | null>(null);

  const handleFetch = async () => {
    setValue("");
    setLoading(true);
    const formData = new FormData();
    if (!audio) return;
    formData.append("audio", audio);
    const response = await fetch("https://acarpio.dev/audioToText", {
      method: "POST",
      // mode: "no-cors",
      body: formData,
    });
    console.log(response);
    if (!response.ok) {
      setLoading(false);
      return;
    }

    const result = (await response.json()) as { message: string };
    setValue(result.message);
    setLoading(false);
    console.log(result);
  };

  return (
    <>
      {!loading ? (
        <div className="container">
          <input
            // style={{ height: 80 }}
            type="file"
            accept="audio/*"
            onChange={(e) => {
              if (!e.target.files) return;
              setAudio(e.target.files[0]);
            }}
          />
          <button
            style={{
              height: 80,
              fontSize: "2rem",
              backgroundColor: "rgb(48, 128, 28)",
            }}
            onClick={handleFetch}
          >
            enviar
          </button>
          <textarea
            value={`
          ${value}
            `}
            readOnly
            style={{ height: 100, resize: "none", fontSize: "1.5rem" }}
          />
          {/* <input
          style={{ height: 200 }}
          type="text"
          value={"hola como estas "}
          readOnly
          placeholder="respuesta..."
        /> */}
        </div>
      ) : (
        <div>cargando...</div>
      )}
    </>
  );
}

export default App;
