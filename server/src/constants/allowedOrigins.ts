import { ENV } from "../config";

const allowedOrigins = [
  ENV.CLIENT_URL,
]

export default allowedOrigins;