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

test("should work", async ({ page, worker }) => {
  await page.goto("/");
  await expect(page.getByTestId("response")).not.toHaveText("");
});
