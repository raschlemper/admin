/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

require('./user.mock'); 
require('./system.mock'); 
require('./user-system.mock');