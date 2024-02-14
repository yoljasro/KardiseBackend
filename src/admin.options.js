const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

// models
const AdminCompany = require('./companies/company.admin');
const CompanyProject = require("./projects/project.admin")
const CompanyClients = require("./Clients/client.admin")
const CompanyMotto = require("./Motto/motto.admin")
/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [AdminCompany, CompanyProject, CompanyClients, CompanyMotto],
};

module.exports = options;
