import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const HOUR_IN_MS = 3600000;

const cache = setupCache({
  maxAge: 4 * HOUR_IN_MS
});

export const http = axios.create({ adapter: cache.adapter, timeout: 1000 });
