const express = require("express");
const cors = require("cors");
const routes = require("./routes/route");

const app = express();
const PORT = 5000;

//Middleware
app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
