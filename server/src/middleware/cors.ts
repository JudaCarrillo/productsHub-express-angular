import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost/4200",
  "http://localhost/8080",
  "https://productsapp-frontend.netlify.app",
];

export const corsMiddleware = (acceptedOrigins = ACCEPTED_ORIGINS) => {
  return cors({
    origin: (origin: any, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        return callback(null, true);
      }

      console.log(origin);

      return callback(new Error("Not allowed by CORS"));
    },
  });
};
