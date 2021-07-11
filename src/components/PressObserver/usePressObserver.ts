import { useEffect, useState } from 'react';
import { Key } from '../../domain/keyboard';

type isPressed = boolean;
type EventCode = string;
type CallbackFunction = () => void;

type Settings = {
	watchKey: Key;
	onStartPress: CallbackFunction;
	onFinishPress: CallbackFunction;
};

export const usePressObserver = ({
	watchKey,
	onStartPress,
	onFinishPress,
}: Settings): isPressed => {
	const [pressed, setPressed] = useState<isPressed>(false);

	useEffect(() => {
		const handlePressStart = ({ code }: KeyboardEvent): void => {
			if (pressed || !equal(watchKey, code)) {
				return;
			}
			setPressed(true);
			onStartPress();
		};

		const handlePressFinish = ({ code }: KeyboardEvent): void => {
			if (!pressed || !equal(watchKey, code)) {
				return;
			}
			setPressed(false);
			onFinishPress();
		};
		document.addEventListener('keydown', handlePressStart);
		document.addEventListener('keyup', handlePressFinish);
		return () => {
			document.removeEventListener('keydown', handlePressStart);
			document.removeEventListener('keyup', handlePressFinish);
		};
	}, [watchKey, onStartPress, onFinishPress, pressed]);

	return pressed;
};

const fromEventCode = (code: EventCode): Key => {
	const prefixRegex = /Key|Digit/gi;
	return code.replace(prefixRegex, '');
};

const equal = (watchKey: Key, eventCode: EventCode): boolean => {
	return fromEventCode(eventCode).toLowerCase() === watchKey.toLowerCase();
};
