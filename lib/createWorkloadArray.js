import { constants } from 'node:fs';
import { access, readFile } from 'node:fs/promises';
import { promisify } from 'node:util';

import glob from 'glob';
import _ from 'lodash';
import parseDuration from 'parse-duration';

const globAsync = promisify(glob);

const getDuration = async function (featureFile) {
  const logFile = featureFile.replace(/\.feature$/, '.log');

  try {
    await access(logFile, constants.R_OK);
  } catch {
    return 0;
  }

  const content = await readFile(logFile, { encoding: 'utf8' });
  let match = content.match(/^(\d+m[\d.]+s) /gm);

  if (!match || !match[0]) {
    return 0;
  }

  return parseDuration(match);
};

export default async function () {
  console.error('Collecting total workload...');

  const result = [];
  const featureFiles = await globAsync("features/**/*.feature");

  let totalWeight = 0;
  for (const feature of featureFiles) {
    const weight = await getDuration(feature);
    totalWeight += weight
    result.push({ feature, weight });
  }

  console.log('Total weight recorded:', totalWeight);

  return result;
};