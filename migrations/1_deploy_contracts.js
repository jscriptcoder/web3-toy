"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Toy = artifacts.require('Toy');
var migration = function (deployer) {
    deployer.deploy(Toy);
};
module.exports = migration;
