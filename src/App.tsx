import { useEffect, useState } from "react";
import { sampleApiClient } from "./api/client";

export default function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    sampleApiClient.postServiceGet({ id: 1 }).then((res) => {
      const { data } = res;
      setResponse(data.row.name);
    });
  }, []);

  return (
    <div>
      <h1>Hello, world!</h1>
      <p data-testid="response">{response}</p>
    </div>
  );
}
