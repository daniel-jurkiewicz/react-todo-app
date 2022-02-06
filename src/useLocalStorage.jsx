import { useState, useEffect } from "react";

const useLocalStorage = (key) => {
	const [storedValue, setStoredValue] = useState(() => {
		return JSON.parse(localStorage.getItem(key));
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storedValue));
	}, [storedValue, key]);

	return [storedValue, setStoredValue];
};

export default useLocalStorage;
