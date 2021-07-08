/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');

const plugins = (
	on,
	config
) => {
	const options = {
		...browserify.defaultOptions,
		typescript: resolve.sync('typescript', { basedir: config.projectRoot }),
	  };
	
  	on('file:preprocessor', cucumber(options)); 	
};

module.exports = plugins; 
