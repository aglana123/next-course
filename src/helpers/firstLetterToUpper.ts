export function firstLetterToUpper(character: string) {
	const firstLetter = character
		.split('')
		.map((value, index) => (index === 0 ? value.toUpperCase() : value))
		.join('');

	return firstLetter;
}
