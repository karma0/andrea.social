// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var app_dns = 'bobby.social';

var path = require('path'),
    config;
var config;

if (process.env.MYSQL_DB_HOST != undefined) {
    config = {
        // ### Production
        // When running Ghost in the wild, use the production environment
        // Configure your URL and mail settings here
        production: {
            url: 'http://'+app_dns,
            mail: {},
            database: {
                client: 'mysql',
                connection: {
                    host     : process.env.MYSQL_DB_HOST,
                    port     : process.env.MYSQL_DB_PORT,
                    user     : process.env.MYSQL_DB_USERNAME,
                    password : process.env.MYSQL_DB_PASSWORD,
                    database : process.env.APP_NAME,
                    charset  : 'utf8'
                }
                },
            server: {
                // Host to be passed to node's `net.Server#listen()`
                host: process.env.NODEJS_IP,
                // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
                port: process.env.NODEJS_PORT
            },
            paths: {
                contentPath: path.join(process.env.GHOST_CONTENT, '/content/')
            }
        }
    }
} else if (process.env.POSTGRESQL_DB_HOST != undefined) {
    config = {
        // ### Production
        // When running Ghost in the wild, use the production environment
        // Configure your URL and mail settings here
        production: {
            url: 'http://'+app_dns,
            mail: {},
            database: {
                client: 'pg',
                connection: {
                    host     : process.env.POSTGRESQL_DB_HOST,
                    port     : process.env.POSTGRESQL_DB_PORT,
                    user     : process.env.POSTGRESQL_DB_USERNAME,
                    password : process.env.POSTGRESQL_DB_PASSWORD,
                    database : process.env.APP_NAME,
                    charset  : 'utf8'
                }
            },
            server: {
                // Host to be passed to node's `net.Server#listen()`
                host: process.env.NODEJS_IP,
                // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
                port: process.env.NODEJS_PORT
            },
            paths: {
                contentPath: path.join(process.env.GHOST_CONTENT, '/content/')
            }
        }
    }
} else {
    config = {
        // ### Development **(default)**
        development: {
            // The url to use when providing links to the site, E.g. in RSS and email.
            url: 'http://my-ghost-blog.com',

            // Example mail config
            // Visit http://support.ghost.org/mail for instructions
            // ```
            //  mail: {
            //      transport: 'SMTP',
            //      options: {
            //          service: 'Mailgun',
            //          auth: {
            //              user: '', // mailgun username
            //              pass: ''  // mailgun password
            //          }
            //      }
            //  },
            // ```

            database: {
                client: 'sqlite3',
                connection: {
                    filename: path.join(process.env.GHOST_CONTENT, '/content/data/ghost-dev.db')
                },
                debug: false
            },
            server: {
                // Host to be passed to node's `net.Server#listen()`
                host: '127.0.0.1',
                // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
                port: '2368'
            },
            paths: {
                contentPath: path.join(process.env.GHOST_CONTENT, '/content/')
            }
        },

        // ### Production
        // When running Ghost in the wild, use the production environment
        // Configure your URL and mail settings here
        production: {
            url: 'http://'+app_dns,
            mail: {},
            database: {
                client: 'sqlite3',
                connection: {
                    filename: path.join(process.env.GHOST_CONTENT, '/content/data/ghost.db')
                },
                debug: false
            },
            server: {
                // Host to be passed to node's `net.Server#listen()`
                host: process.env.NODEJS_IP,
                // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
                port: process.env.NODEJS_PORT
            },
            paths: {
                contentPath: path.join(process.env.GHOST_CONTENT, '/content/')
            }
        },

        // **Developers only need to edit below here**

        // ### Testing
        // Used when developing Ghost to run tests and check the health of Ghost
        // Uses a different port number
        testing: {
            url: 'http://127.0.0.1:2369',
            database: {
                client: 'sqlite3',
                connection: {
                    filename: path.join(process.env.GHOST_CONTENT, '/content/data/ghost-test.db')
                }
            },
            server: {
                host: '127.0.0.1',
                port: '2369'
            },
            logging: false
        },

        // ### Testing MySQL
        // Used by Travis - Automated testing run through GitHub
        'testing-mysql': {
            url: 'http://127.0.0.1:2369',
            database: {
                client: 'mysql',
                connection: {
                    host     : '127.0.0.1',
                    user     : 'root',
                    password : '',
                    database : 'ghost_testing',
                    charset  : 'utf8'
                }
            },
            server: {
                host: '127.0.0.1',
                port: '2369'
            },
            logging: false
        },

        // ### Testing pg
        // Used by Travis - Automated testing run through GitHub
        'testing-pg': {
            url: 'http://127.0.0.1:2369',
            database: {
                client: 'pg',
                connection: {
                    host     : '127.0.0.1',
                    user     : 'postgres',
                    password : '',
                    database : 'ghost_testing',
                    charset  : 'utf8'
                }
            },
            server: {
                host: '127.0.0.1',
                port: '2369'
            },
            logging: false
        }
    };
}

// Export config
module.exports = config;