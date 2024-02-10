const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

// models
const AdminCompany = require('./companies/company.admin');
const ProjectCompany = require("./admin/project")

/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [AdminCompany, ProjectCompany],
};

module.exports = options;
