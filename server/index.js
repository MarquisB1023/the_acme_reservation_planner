const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(require(morgan("dev")));
app.use(express.json());
const port = 300;
const {
  client,
  fetchCustomer,
  fetchReservation,
  fetchRestaurant,
  createCustomer,
  createReservation,
  createRestaurant,
  deleteReservation,
} = require("./db");

const init = async () => {
  await client.connect();
  await createTable();
  const [
    Mickey,
    Gina,
    Len,
    Ren,
    Alex,
    CheesecakeFactory,
    Pho79,
    Ruthcrust,
    OliveGarden,
  ] = await Promise.all([
    createCustomer("Mickey"),
    createCustomer("Gina"),
    createCustomer("Len"),
    createCustomer("Ren"),
    createCustomer("Alex"),
    createRestaurant("Pho79"),
    createRestaurant("Ruthcrust"),
    createRestaurant("CheesecakeFactory"),
    createRestaurant("OliveGarden"),
  ]);
  console.log(await fetchRestaurant());
  const [ResOne, resTwo, resThree] = await Promise.all([
    createReservation({
      party_count: 5,
      Customer_id: Mickey.id,
      restaurant_id: OliveGarden.id,
    }),
  ]);
  console.log(await fetchCustomer());
  app.listen(port, () => {
    console.log("connected at port:" + port + "and  thr database is seeded.");
  });
};

init();
