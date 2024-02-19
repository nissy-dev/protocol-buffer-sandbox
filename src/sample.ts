import { sampleApiClient } from "./api/client";

(async () => {
  const response = await sampleApiClient.postServiceGet({ id: 1 });
  console.log(response.data.row);
})
