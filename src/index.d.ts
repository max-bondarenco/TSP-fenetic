import { Environment } from './Environment.js';
import { Individual } from './Individual.ts';

export interface Client {
  point: Point;
  readonly name: string;
}

export interface TSPParams {
  env: Environment;
  initialPopulation?: Individual[];
  populationSize?: number;
  maxGenerations?: number;
  elitesPerPopulation?: number;
  mutationRate?: number;
  viewPlot: 'best' | 'bestOfGeneration';
}

export interface Point {
  x: number;
  y: number;
}

export type Genome = number[];
