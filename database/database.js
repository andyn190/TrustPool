const pg = require('pg');
const connectionString = 'postgres://micurza:password@localhost/ip:5432/db';
const pgClient = new pg.Client(connectionString);
pgClient.connect();

