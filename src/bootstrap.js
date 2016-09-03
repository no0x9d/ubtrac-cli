'use strict';
const Db = require('tingodb')().Db;
const Ubtrac = require('ubtrac-core');
const osenv = require('osenv');
const path = require('path');
const mkdirp = require('mkdirp');

const ubtracHome = path.join(osenv.home(), '.ubtrac');
mkdirp.sync(ubtracHome);

//config
const configPath = path.join(ubtracHome, 'config.json');

let config;
try {
  config = require(configPath);
} catch (e) {
  config = {}
}

//database
const dbPath = path.join(ubtracHome, 'db');
mkdirp.sync(dbPath);
const db = new Db(dbPath, {});

const ubtrac = Ubtrac(db);

module.exports.db = db;
module.exports.ubtrac = ubtrac;
module.exports.config = config;