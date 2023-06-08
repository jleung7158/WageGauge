import React from 'react';
import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useDarkMode from './useDarkMode';
import { useEffect } from 'react';

export default function Switcher() {
	const [colorTheme, setTheme] = useDarkMode();
	const [darkMode, setDarkMode] = useState(
		colorTheme === 'light' ? true : false
	);

	useEffect(() => {
		setDarkMode(colorTheme === 'dark');
	}, [colorTheme]);

	const toggleDarkMode = (checked) => {
		setTheme(checked ? 'dark' : 'light');
		setDarkMode(checked);
	};

	return (
		<>
			<DarkModeSwitch checked={darkMode} onChange={toggleDarkMode} size={30} />
		</>
	);
}
