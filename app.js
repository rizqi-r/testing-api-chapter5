const express = require("express");
const app = express();
const fs = require("fs");
const yaml = require("yaml");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const file = fs.readFileSync("./oas.yaml", "utf-8");
const swaggerDocument = yaml.parse(file);

const port = 3000;
const v1Router = require("./routes/v1");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/oas", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/v1", v1Router);

// app.use((err, req, res, next) => {
//     res.status(500).json({ err: err.message });
// });

// app.use((req, res, next) => {
//     res.status(404).json({ err: `Cannot ${req.method} ${req.url}` });
// });

// app.listen(port, () => {
//     console.log(`running on port ${port}`);
// });

module.exports = app;