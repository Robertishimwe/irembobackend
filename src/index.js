import express from "express";
import * as dotenv from 'dotenv';
import cluster from "cluster";
import cors from 'cors';
import os from "os";

import routes from "./routes/index";
import connectdb from "./config/database";

dotenv.config()

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Worker processes have a http server.
  const app = express();
  connectdb()
  app.use(express.json())
  app.use(cors())
  app.use('/api', routes);


  // Define a route
  app.get("/", (req, res) => {
    res.send(`Hello from worker ${process.pid}`);
  });

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on PORT ${PORT}`);
  });
}
