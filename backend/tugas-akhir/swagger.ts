import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const doc = {
  info: {
    title: "Sifa Tugas Akhir REST API",
    description: "private REST API for sifa tugas akhir",
    contact: {
      name: "NPE Digital",
      url: "npedigihouse.tech",
      email: "npedigital@gmail.com",
    },
    version: "3.0.3",
  },
  host: `${process.env.SWAGGER_HOSTNAME}:${process.env.PORT}`,
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
