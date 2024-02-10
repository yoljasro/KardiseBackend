const AdminBro = require('admin-bro');
const { Project } = require('../models/project');

const {
    after: passwordAfterHook,
    before: passwordBeforeHook,
} = require('../companies/actions/password.hook');

const {
    after: uploadAfterHook,
    before: uploadBeforeHook,
} = require('../companies/actions/upload-image.hook');

/** @type {AdminBro.ResourceOptions} */
const options = {
    properties: {
        title: {
            isVisible: true,
        },
        description: {
            isVisible: true,
        },
        image: {
            components: {
                edit: AdminBro.bundle('../companies/components/upload-image.edit.tsx'),
                list: AdminBro.bundle('../companies/components/upload-image.list.tsx'),
            },
        },
    },
    actions: {
        new: {
            after: async (response, request, context) => {
                const modifiedResponse = await passwordAfterHook(response, request, context);
                return uploadAfterHook(modifiedResponse, request, context);
            },
            before: async (request, context) => {
                const modifiedRequest = await passwordBeforeHook(request, context);
                return uploadBeforeHook(modifiedRequest, context);
            },
        },
        edit: {
            after: async (response, request, context) => {
                const modifiedResponse = await passwordAfterHook(response, request, context);
                return uploadAfterHook(modifiedResponse, request, context);
            },
            before: async (request, context) => {
                const modifiedRequest = await passwordBeforeHook(request, context);
                return uploadBeforeHook(modifiedRequest, context);
            },
        },
        show: {
            isVisible: false,
        },
    },
};

module.exports = {
    options,
    resource: Project,
};
