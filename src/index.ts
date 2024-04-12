import { Environment } from './Environment.js';
import { generateClients } from './utils.js';
import TSP from './TSP.js';

const env = new Environment(
  generateClients([
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ]),
);

TSP({
  env,
  populationSize: 1000,
  maxGenerations: 200,
  mutationRate: 0.5,
  elitesPerPopulation: 20,
  viewPlot: 'best',
});
