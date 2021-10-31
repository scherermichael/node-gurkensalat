#!/usr/bin/env node

import getenv from 'getenv';

import createWorkloadArray from '../lib/createWorkloadArray.js';
import distribute from '../lib/distribute.js';
import run from '../lib/run.js';
import printLogsAndExit from '../lib/printLogsAndExit.js';

(async () => {
  const count = process.argv[2] || getenv.int('GURKENSALAT_COUNT', 1);
  const myIndex = process.argv[3] || getenv.int('GURKENSALAT_INDEX', 0);
  const command = getenv('GURKENSALAT_COMMAND', 'npx cucumber-js');

  const workload = await createWorkloadArray();
  const myLoad = await distribute({ workload, count, index: myIndex });
  await run(myLoad, command);
  await printLogsAndExit(myLoad);
})();