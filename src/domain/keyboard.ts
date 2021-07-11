import { OctaveIndex, PitchIndex } from './note';

export type Key = string;
export type Keys = string[];

export const TOP_ROW: Keys = Array.from('q2w3e4r5t6y7u');
export const BOTTOM_ROW: Keys = Array.from('zsxdcfvgbhnjm');

export const selectKey = (octave: OctaveIndex, pitch: PitchIndex): Key => {
	const keysRow = octave < 5 ? TOP_ROW : BOTTOM_ROW;
	return keysRow[pitch];
};
