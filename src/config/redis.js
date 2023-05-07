// import { createClient } from "redis";

// const redisClient = createClient({
//   password: "b1oNDXd0Q2fyAXlZj7KF3Nitq2wDCNdF",
//   socket: {
//     host: "redis-14165.c80.us-east-1-2.ec2.cloud.redislabs.com",
//     port: 14165,
//   },
// });

// redisClient.on("connect", () => {
//   console.log("Connected to Redis");
// });

// redisClient.on("error", (err) => {
//   console.error("Error connecting to Redis:", err);
// });

// export default redisClient;


import { createClient } from "redis";

const redisClient = createClient({
  url: `redis://user:b1oNDXd0Q2fyAXlZj7KF3Nitq2wDCNdF@redis-14165.c80.us-east-1-2.ec2.cloud.redislabs.com:14165`,
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

export default redisClient;
