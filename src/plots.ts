import { Layout, plot, Plot } from 'nodeplotlib';
import { Environment } from './Environment.js';
import { Individual } from './Individual.js';

export const makePlot = (env: Environment, individual: Individual): void => {
  const x: number[] = [];
  const y: number[] = [];
  const names: string[] = [];

  individual.genome.forEach((e) => {
    x.push(env.clients[e].point.x);
    y.push(env.clients[e].point.y);
    names.push(env.clients[e].name);
  });

  const data: Plot[] = [
    {
      x,
      y,
      mode: 'text+lines+markers',
      text: names,
      textposition: 'top center',
      type: 'scatter',
    },
  ];

  const layout: Layout = {
    title: `Generation: ${env.generation}, Length: ${individual.fitness.toFixed(
      0,
    )}`,
  };

  plot(data, layout);
};
