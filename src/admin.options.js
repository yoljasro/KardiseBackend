const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

// models
const AdminCompany = require('./companies/company.admin');
const CompanyProject = require("./projects/project.admin")
const CompanyLogo = require("./ProjectsLogo/projectLogo.admin")
const CompanyClients = require("./Clients/client.admin")
const CompanyMotto = require("./Motto/motto.admin")
const CompanyCommand = require("./Command/command.admin")
/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [AdminCompany, CompanyProject, CompanyClients, CompanyMotto , CompanyLogo , CompanyCommand],
};

module.exports = options;
