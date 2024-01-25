const AdminBro = require('admin-bro');
const { Dropzone } = require('admin-bro/design-system');

const MyUploadComponent = (props) => {
    const { property, onChange, record, translate } = props;

    return AdminBro.bundle(
        React.createElement(Dropzone, {
            onChange: (files) => onChange(property.name, files),
            multiple: false,
            maxFiles: 1,
            value: record.params[property.name] || '',
            translations: {
                dropzone: {
                    title: translate('dropzone.title'),
                    subtitle: translate('dropzone.subtitle'),
                    placeholder: translate('dropzone.placeholder'),
                },
            },
        })
    );
};

module.exports = MyUploadComponent;
