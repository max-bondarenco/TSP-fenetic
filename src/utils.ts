import { Client, Point } from './index.d.js';

export const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const probability = (p: number): boolean => {
  return Math.random() <= p;
};

export const dist = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const getInterval = (min: number, max: number): [number, number] => {
  const start = randInt(min, max - 1);
  const end = randInt(start, max);

  return [start, end];
};

export const generateClients = (names: string[]): Client[] => {
  return names.map((name) => ({
    point: { x: randInt(-50, 50), y: randInt(-50, 50) },
    name,
  }));
};
