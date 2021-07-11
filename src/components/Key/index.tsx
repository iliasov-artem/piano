import { FunctionComponent } from 'react';
import clsx from 'clsx';

import { usePressObserver } from '../PressObserver/usePressObserver';

import { NoteType } from '../../domain/note';
import styles from './Key.module.css';

type PressCallback = () => void;

type KeyProps = {
	type: NoteType;
	label: string;
	disabled?: boolean;
	onDown: PressCallback;
	onUp: PressCallback;
};

export const Key: FunctionComponent<KeyProps> = ({
	type,
	label,
	disabled,
	onDown,
	onUp,
}) => {
	const pressed = usePressObserver({
		watchKey: label,
		onStartPress: onDown,
		onFinishPress: onUp,
	});
	return (
		<button
			className={clsx(styles.key, styles[type], pressed && 'is-pressed')}
			type="button"
			disabled={disabled}
			onMouseDown={onDown}
			onMouseUp={onDown}
		>
			{label}
		</button>
	);
};
