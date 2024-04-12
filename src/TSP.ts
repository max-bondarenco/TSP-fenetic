import { Individual } from './Individual.js';
import { TSPParams } from './index.d.js';
import { makePlot } from './plots.js';
import { getInterval, probability } from './utils.js';

export default (params: TSPParams): Individual => {
  const env = params.env;
  const populationSize = params.initialPopulation
    ? params.initialPopulation.length
    : params.populationSize || 100;
  let population =
    params.initialPopulation || Individual.makePopulation(env, populationSize);
  const maxGenerations = params.maxGenerations || 999;
  const elitesPerPopulation = params.elitesPerPopulation || 0;
  const mutationRate = params.mutationRate || 0;
  const viewPlot = params.viewPlot;

  while (env.generation < maxGenerations) {
    //Sort current generation and save best Individuals
    const oldElite = sort(population, elitesPerPopulation);
    //View the best Individual of the current generation
    if (viewPlot === 'bestOfGeneration') makePlot(env, population[0]);
    //Perform crossover to get a new generation
    const newGeneration = crossover(population);
    //Perform mutations on a new generation
    mutate(newGeneration, mutationRate);
    //Sacrifice some children to save elite
    population = oldElite.concat(newGeneration).slice(0, populationSize);
    //Increase generation count
    env.generation++;
  }

  //View the best Individual of the last generation
  makePlot(env, population[0]);
  return population[0];
};

export const sort = (
  population: Individual[],
  eliteCount: number = 0,
): Individual[] => {
  const bestParents = population
    .sort((a, b) => a.fitness - b.fitness)
    .slice(0, population.length / 2);

  population = [...bestParents];
  return population.slice(0, eliteCount);
};

export const crossover = (population: Individual[]): Individual[] => {
  const group1 = population.slice(0, population.length / 2);
  const group2 = group1.splice(group1.length / 2, group1.length);

  const offsprings: Individual[] = [];

  for (let i = 0; i < group1.length; i++) {
    offsprings.push(getOffspring(group1[i], group2[i]));
    offsprings.push(getOffspring(group2[i], group1[i]));
    offsprings.push(getOffspring(group1[i], group2[i]));
    offsprings.push(getOffspring(group2[i], group1[i]));
  }

  return offsprings;
};

export const getOffspring = (
  parent1: Individual,
  parent2: Individual,
): Individual => {
  const genome1 = [...parent1.genome];
  const genome2 = [...parent2.genome];
  const offspringGenome: number[] = [];

  const [start, end] = getInterval(1, genome1.length - 1);
  const genome1Part = genome1.slice(start, end);
  const genome2Part = genome2.filter((gen) => !genome1Part.includes(gen));

  for (let i = 0; i < genome1.length; i++)
    if (i >= start && i < end) {
      offspringGenome.push(genome1Part.shift()!);
    } else offspringGenome.push(genome2Part.shift()!);

  return new Individual(parent1.env, offspringGenome);
};

export const mutate = (
  population: Individual[],
  mutationRate: number,
  eliteCount: number = 0,
): void => {
  for (let i = eliteCount; i < population.length; i++)
    if (probability(mutationRate)) population[i].mutate();
};
