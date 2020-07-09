"use strict";
module.exports = () => {
    if (process.env.NODE_ENV == 'development')
        return require('./env/development.env');
    else
        return require('./env/test.env');
};
