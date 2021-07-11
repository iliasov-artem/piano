import { InstrumentName } from 'soundfont-player';
import instruments from 'soundfont-player/names/musyngkite.json';

type Option = {
	label: string;
	value: InstrumentName;
};

type OptionsList = Option[];
type InstrumentList = InstrumentName[];

const normalizeList = (list: InstrumentList): OptionsList => {
	return list.map((instrument) => ({
		value: instrument,
		label: instrument.replace(/_/gi, ' '),
	}));
};

export const options = normalizeList(instruments as InstrumentList);
