'use strict';
exports.command = 'import <ticket>';
exports.desc = 'create a new task from a Jira <ticket>';
exports.builder = {};
exports.handler = function(argv) {
  console.log('adding from %s', argv.ticket);
  const context = require('../../bootstrap');
  const taskRepository = context.ubtrac.taskRepository;
  const request = require('superagent');

  queryUserForDetails(context.config)
    .then(params =>
      request.get(`${params.host}/rest/api/2/issue/${argv.ticket}`)
        .query({fields: 'summary,description,project'})
        .auth(params.user, params.pass)
    )
    .then(res => taskRepository.create(mapTicketToTask(res.body)))
    .then(t => console.log(t))
    .catch(console.log);
};

function mapTicketToTask(ticket) {
  return {
    _jira: ticket.self,
    title: ticket.fields.summary,
    description: ticket.fields.description,
    project: ticket.fields.project.name
  }
}

function queryUserForDetails(config) {
  const get = require('lodash.get');
  const base = 'cli.task.import.jira';
  const params = {
    host: get(config, base + '.host'),
    user: get(config, base + '.user'),
    pass: get(config, base + '.pass')
  };

  const inquirer = require('inquirer');
  const questions = [
    {
      type: 'input',
      name: 'host',
      message: 'Jira host:',
      when: !params.host
    }, {
      type: 'input',
      name: 'user',
      message: 'Jira user:',
      when: !params.user
    }, {
      type: 'password',
      name: 'pass',
      message: 'Jira password:',
      when: !params.pass
    },
  ];

  return inquirer.prompt(questions)
    .then(answers => Object.assign(params, answers))
}