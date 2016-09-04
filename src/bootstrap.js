'use strict';
const Db = require('tingodb')().Db;
const Ubtrac = require('ubtrac-core');
const osenv = require('osenv');
const path = require('path');
const mkdirp = require('mkdirp');
const Config = require('./config');

const ubtracHome = path.join(osenv.home(), '.ubtrac');
mkdirp.sync(ubtracHome);

//config
const config = Config.load('config');

//database
const dbPath = config.db || path.join(ubtracHome, 'db');
mkdirp.sync(dbPath);
const db = new Db(dbPath, {});

const ubtrac = Ubtrac(db);

module.exports.db = db;
module.exports.ubtrac = ubtrac;
module.exports.config = config;