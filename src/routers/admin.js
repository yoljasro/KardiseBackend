const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const { buildRouter } = require('admin-bro-expressjs');
const express = require('express');
const path = require('path');

const Product = require('../models/product');

AdminBro.registerAdapter(AdminBroMongoose);

const adminBroOptions = {
  resources: [
    {
      resource: Product,
      options: {
        properties: {
          // Rasmlarni saqlash uchun yordamchi funksiya
          image: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },
        actions: {
          // Rasmlarni yuklash uchun middleware qo'shish
          new: {
            after: async (response, request, context) => {
              if (request.method === 'post' && context.record.params.image) {
                const imageDestination = path.join(__dirname, '../public/uploads', context.record.id().toString());
                const image = context.record.params.image;
                const extension = image.name.split('.').pop();
                const imageName = `${context.record.id().toString()}.${extension}`;
                await image.move(imageDestination, { name: imageName });
                context.record.update({ image: imageName });
              }
              return response;
            },
          },
        },
      },
    },
  ],
};

const adminBro = new AdminBro(adminBroOptions);

module.exports = adminBro;