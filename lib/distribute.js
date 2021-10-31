import verteiler from 'verteiler';

export default async function ({workload, count, index }) {
  console.log(`Distributing among ${count} servers...`);

  const distribution = verteiler(workload, (item) => item.weight, count);

  console.log(`My workload (#${index}):`);
  console.log(JSON.stringify(distribution[index], null, 2));

  let totalWeight = 0;
  for (const item of distribution[index]) {
    totalWeight += item.weight
  }
  console.log('My workload weight:', totalWeight);

  return distribution[index];
};