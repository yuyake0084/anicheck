/* @flow */

require('@babel/register');

global.__DEV__ = process.env.NODE_ENV === 'development';

require('./server');
