import verteiler from 'verteiler';
import shell from 'shelljs';

export default async function (workload, command) {
  console.log('Running...');

  for (const item of workload) {
    const logFile = item.feature.replace(/\.feature$/, '.log');

    console.log(`\n=== ${item.feature} ===\n`);
    const { code } = await shell.exec(`${command}  --format "summary:${logFile}" "${item.feature}"`);
    item.isSuccess = code === 0;
  }
};