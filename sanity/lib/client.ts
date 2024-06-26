import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
  token: process.env.SANITY_SECRET_TOKEN,
  ignoreBrowserTokenWarning: true,
});
