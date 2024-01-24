// const { default: adminBro } = require("admin-bro");
const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
// mongoose
const mongoose = require("mongoose");
// models
const User = require("../models/user")

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
    branding: {
        companyName: "Uzbekistan Tech Service"
    },
    databases: [mongoose],
    rootPath: "/admin",
    resources: [
        {
            resource: User,
            options: {
                parent: {
                    name: "UTS clients",
                    icon: "fas fa-request",
                },
            }
        }
    ]
})
  
// admin panel settings
const ADMIN = {
    email: process.env.ADMIN_EMAIL || "saidaliyevjasur450@gmail.com",
    password: process.env.ADMIN_PASSWORD || "yoljasron1221Jas",
  };
  
  const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || "worldhalal",
    cookiePassword: process.env.ADMIN_COOKIE_PASS || "worldhalal1221",
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
      return null;
    },
  });
  
  module.exports = router;

