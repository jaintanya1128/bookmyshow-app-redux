const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const PORT = process.env.PORT;
const app = express();

//to handle cors errors
app.use(cors());

//initialize the Body Parser Middleware
app.use(express.json()); //this will handle raw json

routes(app);

app.listen(PORT, () => `Server is listening to the port on ${PORT}`);
