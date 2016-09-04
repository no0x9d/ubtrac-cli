'use strict';
const osenv = require('osenv');
const path = require('path');
const jsonfile = require('jsonfile');
const set = require('lodash.set');
const unset = require('lodash.unset');

const ubtracHome = path.join(osenv.home(), '.ubtrac');

function loadConfig(name) {
  const configPath = path.join(ubtracHome, name + '.json');

  const config = {ubtracHome};
  try {
    const fileConfig = jsonfile.readFileSync(configPath);
    Object.assign(config, fileConfig);
  } catch (e) {
    console.log('could not load config at', configPath);
  }
  return config;
}

function saveConfig(name, config) {
  const configPath = path.join(ubtracHome, name + '.json');

  //remove ubtrac home dir from config. this prop is transient
  delete config.ubtracHome;

  jsonfile.writeFileSync(configPath, config);
}

function setConfig(name, props) {
  const config = loadConfig(name);
  for (let prop in props) {
    set(config, prop, props[prop])
  }
  saveConfig(name, config);
}

function unsetConfig(name, props) {
  const config = loadConfig(name);
  let dirty = false;
  props.forEach(prop => {
    //TODO unset empty parent configs
    dirty = dirty || unset(config, prop)
  });

  if (dirty) saveConfig(name, config);
  return dirty;
}

module.exports.load = loadConfig;
module.exports.save = saveConfig;
module.exports.set = setConfig;
module.exports.unset = unsetConfig;