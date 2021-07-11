import { InstrumentContextProvider } from '../../state/Instrument/Provider';
import { InstrumentSelector } from '../InstrumentSelector';
import { KeyboardWithInstrument } from '../Keyboard/WithInstrument';

export const Playground = () => {
	return (
		<InstrumentContextProvider>
			<div className="playground">
				<KeyboardWithInstrument />
				<InstrumentSelector />
			</div>
		</InstrumentContextProvider>
	);
};
