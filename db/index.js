const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://localhost/jobs_db'
});

client.connect();

module.exports = client;
