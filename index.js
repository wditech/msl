require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

// capturar body
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: "*" }));

// Conexión a Base de datos
require("./databases/database");

// import routes
const authRoutes = require("./routes/auth.routes");
const apiRoutes = require("./routes/api.routes");
const codesRoutes = require("./routes/codes.routes");
const placesRoutes = require("./routes/places.routes");
const boreTypeRoutes = require("./routes/boretype.routes");
const observationRoutes = require("./routes/observation.routes");
const codesGroupRoutes = require("./routes/codesgroup.routes");

// route middlewares
const verifyToken = require("./middlewares/validate-token.middleware");

app.use("/api/dashboard", verifyToken, apiRoutes);
app.use("/api/codes", codesRoutes);
app.use("/api/user", authRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/boretype", boreTypeRoutes);
app.use("/api/observations", observationRoutes);
app.use("/api/codesgroup", codesGroupRoutes);

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`servidor andando en: ${PORT}`);
});
