import { Client, Genome } from './index.d.js';
import { dist, randInt } from './utils.js';

export class Environment {
  private declare distances: number[][];
  public generation = 1;

  constructor(public clients: Client[]) {
    const distances: number[][] = [];
    for (let i = 0; i < clients.length; i++) distances.push([]);
    this.distances = distances;
  }

  public generateGenome(): Genome {
    const genome = [0];

    while (genome.length < this.clients.length) {
      const client = randInt(1, this.clients.length - 1);
      if (!genome.includes(client)) genome.push(client);
    }

    genome.push(0);
    return genome;
  }

  public getDistance(index1: number, index2: number): number {
    if (this.distances[index1][index2] === undefined) {
      const distance = dist(
        this.clients[index1].point,
        this.clients[index2].point,
      );

      this.distances[index1][index2] = distance;
      this.distances[index2][index1] = distance;
    }

    return this.distances[index1][index2];
  }
}
