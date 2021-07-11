import { Optional } from './types';

export const accessContext = (): Optional<AudioContextType> => {
	return window.AudioContext || window.webkitAudioContext || null;
};
