import { useState, useRef } from 'react';
import Soundfont, { InstrumentName, Player } from 'soundfont-player';
import { MidiValue } from '../../domain/note';
import { Optional } from '../../domain/types';
import { AudioNodesRegistry, DEFAULT_INSTRUMENT } from '../../domain/sound';

type Settings = {
	AudioContext: AudioContextType;
};

interface Adapted {
	loading: boolean;
	current: Optional<InstrumentName>;
	load(instrument?: InstrumentName | any): Promise<void>;
	play(note: MidiValue): Promise<void>;
	stop(note: MidiValue): Promise<void>;
}

export const useSoundfont = ({ AudioContext }: Settings): Adapted => {
	let activeNotes: AudioNodesRegistry = {};
	const [current, setCurrent] = useState<Optional<InstrumentName>>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [player, setPlayer] = useState<Optional<Player>>(null);
	const audio = useRef(new AudioContext());

	const load = async (instrument: InstrumentName = DEFAULT_INSTRUMENT) => {
		setLoading(true);
		const player = await Soundfont.instrument(audio.current, instrument);
		setLoading(false);
		setCurrent(instrument);
		setPlayer(player);
	};

	const resume = async () => {
		return audio.current.state === 'suspended'
			? await audio.current.resume()
			: Promise.resolve();
	};

	const play = async (note: MidiValue) => {
		await resume();
		if (!player) {
			return;
		}

		const node = player.play(note.toString());
		activeNotes = { ...activeNotes, [note]: node };
	};

	const stop = async (note: MidiValue) => {
		await resume();
		if (!activeNotes[note]) {
			return;
		}
		activeNotes[note]!.stop();
		activeNotes = { ...activeNotes, [note]: null };
	};

	return {
		loading,
		current,
		load,
		play,
		stop,
	};
};
