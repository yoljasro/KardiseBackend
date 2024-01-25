const express = require('express');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs').promises;
const MyUploadComponent = require('../my-upload-component');


AdminBro.registerAdapter(AdminBroMongoose);

const Product = require('../models/product');

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  resources: [
    {
      resource: Product,
      options: {
        parent: {
          name: 'Product test',
          icon: 'fas fa-request',
        },
        properties: {
          // Avvalgi ma'lumotlar
          name: { type: 'string' },
          price: { type: 'number' },
          // Yangi maydon
          image: {
            type: 'upload',
            isVisible: { list: false, show: true, edit: true, filter: true },
            components: {
              edit: AdminBro.bundle(MyUploadComponent),
            },
            custom: {
              fileFn: async (request, { record, file }) => {
                const maxSize = 5 * 1024 * 1024; // 5MB
                if (file.size > maxSize) {
                  throw new Error('Rasm hajmi chegaralangan: 5MB dan kam bo\'lishi kerak');
                }

                const filePath = path.join(__dirname, '../public/uploads', file.name);
                await fs.rename(file.path, filePath);

                record.params.image = `/uploads/${file.name}`;
                await record.save();
              },
            },
          },
        },
      },
    },
  ],
});

const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'worldhalal',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'worldhalal1221',
  authenticate: async (email, password) => {
    const ADMIN = {
      email: process.env.ADMIN_EMAIL || '1',
      password: process.env.ADMIN_PASSWORD || '1',
    };

    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN;
    }
    return null;
  },
});

module.exports = adminRouter;
