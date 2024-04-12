import assert from 'assert';
import { dist, randInt } from '../utils.js';
import { Genome, Point } from '../index.d.js';
import { Environment } from '../Environment.js';
import { Individual } from '../Individual.js';
import TSP, { crossover, mutate, sort } from '../TSP.js';

describe('Math Fucntions', () => {
  describe('randInt()', () => {
    it('should return random integer in given bounds, inclusive', () => {
      let curInt: number;
      const min = -10;
      const max = 10;

      for (let t = 0; t < 100; t++) {
        curInt = randInt(min, max);
        assert(curInt >= min && curInt <= max);
      }
    });
  });

  describe('dist()', () => {
    it('should return distance between two points', () => {
      const p1: Point = { x: 4, y: 5 };
      const p2: Point = { x: 1, y: 1 };

      assert.equal(dist(p1, p2), 5);
    });
  });
});

describe('Algorithm', () => {
  const testEnv = new Environment([
    { name: 'A', point: { x: -10, y: 10 } },
    { name: 'B', point: { x: 0, y: 0 } },
    { name: 'C', point: { x: -10, y: 5 } },
    { name: 'D', point: { x: 15, y: -5 } },
    { name: 'E', point: { x: 5, y: -10 } },
  ]);

  const testGenomes: Genome[] = [
    [0, 1, 2, 3, 4, 0],
    [0, 2, 1, 4, 3, 0],
    [0, 3, 1, 4, 2, 0],
    [0, 4, 2, 3, 1, 0],
  ];

  const population = testGenomes.map((genome) => {
    const individual = new Individual(testEnv, genome);
    //makePlot(testEnv, individual);
    return individual;
  });

  let elite: Individual[];

  describe('Fitness Evaluation', () => {
    it('should properly calculate fitness for initial population', () => {
      const actual = population.map(
        (individual) => +individual.fitness.toFixed(0),
      );
      const expected = [88, 68, 82, 103];

      assert.deepEqual(actual, expected);
    });
  });

  describe('Sort', () => {
    it('should properly sort generation based on fitness', () => {
      elite = sort(population, 1);

      const actual = population.map(
        (individual) => +individual.fitness.toFixed(0),
      );
      const expected = [68, 82, 88, 103];

      assert.equal(+elite[0].fitness.toFixed(0), 68);
      assert.deepEqual(actual, expected);
    });
  });

  describe('Offsprings', () => {
    it('should perform crossover', () => {
      const newGeneration = crossover(population);
      //newGeneration.forEach((individual) => makePlot(testEnv, individual));

      assert.equal(newGeneration.length, population.length);
    });

    it('should perform mutation', () => {
      const preMutation: Genome[] = population.map((individual) => [
        ...individual.genome,
      ]);

      mutate(population, 1, 1);
      //population.forEach((individual) => makePlot(testEnv, individual));

      assert.deepEqual(population[0].genome, preMutation[0]);
      for (let i = 1; i < population.length; i++) {
        assert.notDeepEqual(population[i].genome, preMutation[i]);
      }
    });
  });

  describe('Results', () => {
    const population = testGenomes.map(
      (genome) => new Individual(testEnv, genome),
    );

    it('should find the best result for given population', () => {
      const result = TSP({
        env: testEnv,
        initialPopulation: population,
        populationSize: 1000,
        maxGenerations: 200,
        mutationRate: 0.5,
        elitesPerPopulation: 20,
        viewPlot: 'best',
      });

      assert.equal(result.fitness.toFixed(0), 67);
    });
  });
});
