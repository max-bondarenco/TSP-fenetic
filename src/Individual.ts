import { Environment } from './Environment.js';
import { Genome } from './index.d.js';
import { randInt } from './utils.js';

export class Individual {
  public declare genome: Genome;
  public declare fitness: number;

  constructor(public env: Environment, genome?: Genome) {
    this.genome = genome ? genome : this.env.generateGenome();
    this.fitness = this.calculateFitness();
  }

  public static makePopulation(env: Environment, amount: number): Individual[] {
    const individuals: Individual[] = [];

    for (let i = 0; i < amount; i++) {
      individuals.push(new Individual(env));
    }

    return individuals;
  }

  public calculateFitness(): number {
    let fitness = 0;

    for (let i = 0; i < this.genome.length - 1; i++) {
      fitness += this.env.getDistance(this.genome[i], this.genome[i + 1]);
    }

    return fitness;
  }

  public mutate(): void {
    let gen1 = 0;
    let gen2 = 0;

    while (gen1 == gen2) {
      gen1 = randInt(1, this.genome.length - 2);
      gen2 = randInt(1, this.genome.length - 2);
    }

    const temp = this.genome[gen1];
    this.genome[gen1] = this.genome[gen2];
    this.genome[gen2] = temp;

    this.fitness = this.calculateFitness();
  }
}
