const express = require('express');
const { default: AdminBro } = require('admin-bro');
const mongoose = require('mongoose');
const cors = require('cors');
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');

const app = express();
const port = 5000;
//controllers 
const { createCompany, getAllCompanies } = require("./controllers/company.controller")
const { createProject, getAllProjects } = require("./controllers/project.controller")
const {createClient , getAllClients} = require("./controllers/client.controller")
const {createMotto , getAllMotto} = require("./controllers/motto.controller")
const {createProjectLogo  , getAllProjectLogos} = require("./controllers/projectLogo.controller")
const {createCommand , getAllCommand} = require("./controllers/command.controller")

app.use(cors());


const run = async () => {
  try {
    await mongoose.connect('mongodb+srv://saidaliyevjasur450:e2vxdfq0ZpZBINMU@kardiseproject.rbqdzor.mongodb.net', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log('Connected to MongoDB database');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }



  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);

  app.use(admin.options.rootPath, router);
  app.use(express.json());
  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: true }));

  app.use('/uploads', express.static('uploads'));

  app.get("/", (req, res) => {
    res.send("hello world. I'm JasurBek");
  });

  // companies
  app.post("/company", createCompany)
  app.get("/company", getAllCompanies)
  // projects
  app.post("/projects", createProject)
  app.get("/projects", getAllProjects)
  // clients
  app.post("/clients" , createClient)
  app.get("/clients" , getAllClients)
  // motto
  app.post("/motto" , createMotto)
  app.get("/motto" , getAllMotto)
  // projectLogos
  app.post("/projectlogos" , createProjectLogo)
  app.get("/projectlogos" , getAllProjectLogos)
  // commands
  app.post("/command " , createCommand)
  app.get("/command" , getAllCommand)

  app.listen(port, () => console.log(
    `Example app listening at http://localhost:${port}`,
  ));
};


module.exports = run;
