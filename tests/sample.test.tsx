import { test as base, expect } from "@playwright/test";
import type { MockServiceWorker } from "playwright-msw";
import { createWorkerFixture } from "playwright-msw";

import { getSampleAPIMock } from "../src/api/generated";

const handlers = getSampleAPIMock();

const test = base.extend<{
  worker: MockServiceWorker;
}>({
  worker: createWorkerFixture(handlers),
});

test("should work", async ({ page, request }) => {
  await page.goto("http://localhost:3000");
  const response = await request.post("/v1/post/get", {
    data: {
      id: 1,
    },
  });
  expect(response.status()).toBe(200);
});
