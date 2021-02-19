const lib = require('../exercise1');

//fizzbuzz test
describe('fizzbuzz', () => {
	it('Should throw an exception if input is != number', () => {
		expect(() => {
			lib.fizzBuzz('a');
		}).toThrow();
		expect(() => {
			lib.fizzBuzz(null);
		}).toThrow();
	});

	it('Should return FizzBuzz if input is divisible by 3 or 5', () => {
		const result = lib.fizzBuzz(15);
		expect(result).toBe('FizzBuzz');
	});

	it('Should return Fizz if input is only divisible by 3', () => {
		const result = lib.fizzBuzz(3);
		expect(result).toBe('Fizz');
	});

	it('Should return Buzz if input is only divisible by 5', () => {
		const result = lib.fizzBuzz(5);
		expect(result).toBe('Buzz');
	});

	it('Should return input if input is neither divisible by 3 or 5', () => {
		const result = lib.fizzBuzz(2);
		expect(result).toBe(2);
	});
});
