const express = require('express');
const { default: AdminBro } = require('admin-bro');
const mongoose = require('mongoose');
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');
const Company = require('./companies/company.entity');

const app = express();
const port = 5000;
//controllers 
const { getCompany, addCompany } = require("./controllers/company.controller")

const run = async () => {
  await mongoose.connect('mongodb+srv://saidaliyevjasur450:e2vxdfq0ZpZBINMU@kardiseproject.rbqdzor.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);

  app.use(admin.options.rootPath, router);
  app.use(express.json());

  app.use('/uploads', express.static('uploads'));

  app.get("/", (req, res) => {
    res.send("hello world. I'm JasurBek");
  });

  // companies
  app.get("/company", getCompany)
  app.post("/company", addCompany)


  app.listen(port, () => console.log(
    `Example app listening at http://localhost:${port}`,
  ));
};


module.exports = run;
