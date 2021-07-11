import { useEffect } from 'react';
import { useInstrument } from '../../state/Instrument/Context';
import { useAudioContext } from '../AudioContextProvider';
import { useSoundfont } from '../../adapters/SoundFont/useSoundFont';

import { Keyboard } from '../Keyboard';

export const KeyboardWithInstrument = () => {
	const AudioContext = useAudioContext()!;
	const { instrument } = useInstrument();
	const { loading, play, stop, load, current } = useSoundfont({ AudioContext });

	useEffect(() => {
		if (!loading && instrument !== current) {
			load(instrument);
		}
	}, [loading, instrument, current, load]);

	return <Keyboard loading={loading} play={play} stop={stop} />;
};
