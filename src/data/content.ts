/**
 * Editorial content lives in content.json: capabilities, philosophy, process,
 * what's current, and the answer-engine FAQ. This module only types it.
 */
import data from './content.json';

export type Capability = {
  num: string;
  title: string;
  kicker?: string;
  summary: string;
  detail: string;
  focus: string[];
  chain?: string[];
};
export type Belief = { title: string; body: string };
export type Stage = { name: string; desc: string; now?: boolean };
export type NowItem = { label: string; body: string };
export type Faq = { q: string; a: string };
export type ProcessStep = { step: string; title: string; body: string; list: string[] };

export const capabilities: Capability[] = data.capabilities;
export const journey: string[] = data.journey;
export const needs: string[] = data.needs;
export const beliefs: Belief[] = data.beliefs;
export const evolution: Stage[] = data.evolution;
export const now: NowItem[] = data.now;
export const faq: Faq[] = data.faq;
export const processSteps: ProcessStep[] = data.process;
