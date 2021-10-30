import { constants } from 'node:fs';
import { access, readFile } from 'node:fs/promises';

const print = async function (featureFile) {
  const logFile = featureFile.replace(/\.feature$/, '.log');

  try {
    await access(logFile, constants.R_OK);
  } catch {
    return 0;
  }

  console.log(`\n=== Failed: ${featureFile} ===\n`)
  console.log(await readFile(logFile, { encoding: 'utf8' }));
};

export default async function (workload) {
  let containsFailures = false;
  for (const item of workload) {
    if (! item.isSuccess) {
      containsFailures = true;
      await print(item.feature);
    }
  }

  if (containsFailures) {
    console.log('Error: Some features failed.')
    process.exit(1);
  }

  console.log('\nDone: All features completed.')
  process.exit(0);
};