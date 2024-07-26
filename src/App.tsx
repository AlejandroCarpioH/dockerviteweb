import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useEffect } from "react";
import "./App.css";
import { getApi } from "./api/getData";

interface data {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

function App() {
  const [users, setUsers] = useState<data[]>([]);

  useEffect(() => {
    (async () => {
      const data = (await getApi()) as data[];
      setUsers(data);
    })();
  }, []);

  return (
    <>
      <div>
        {users.map((user) => {
          return (
            <div style={{ display: "grid", gap: "1rem" }}>
              <p>{user.id}</p>
              <p>{user.title}</p>
              <p>{user.completed}</p>
              <p>{user.userId}</p>
              <p>hola alejandro 2</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
