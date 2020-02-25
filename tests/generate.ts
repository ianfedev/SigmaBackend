import 'reflect-metadata';

import express from 'express';
import DemoLoader from "./loaders/demo";
import Logger from '../src/loaders/logger';
import { Container } from "typedi";

async function startServer() {
  try {
    const app = express();
    Logger.info("Creating demo records for fast usage");
    await require('../src/loaders').default({ expressApp: app });
    const demo : DemoLoader = Container.get(DemoLoader);
    await demo.generateDemoModels();
    Logger.info("Successfully created demo records");
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  }
}

startServer();
