const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

//jest function = jest.fn()
//const mockFunction = jest.fn();
//mockFunction.mockResultValue(1);
//mockFunction.mockResolvedValue();
//mockFunction.mockRejectedValue(new Error('...'));
//const result = await mockFunction();

// Testing numbers
//For grouping a bunch of related test
describe('absolute', () => {
	//two arg, 1st - name if our test, 2nd - function were we implement our test
	it(' should return a postive number if input is positive', () => {
		const result = lib.absolute(1);
		expect(result).toBe(1);
	});

	it(' should return a postive number if input is negative', () => {
		const result = lib.absolute(-1);
		expect(result).toBe(1);
	});

	it(' should return a 0 number if input is 0', () => {
		const result = lib.absolute(0);
		expect(result).toBe(0);
	});
});

// Testing strings
describe('greet', () => {
	it(' Should return the greeting message', () => {
		expect(lib.greet('Chris')).toMatch(/Chris/);
		expect(lib.greet('Chris')).toContain('Chris');
	});
});

// Testing arrays
describe('getCurrencies', () => {
	it('Should return supported currencies', () => {
		const result = lib.getCurrencies();

		// Too general
		expect(result).toBeDefined();
		expect(result).not.toBeNull();

		//Too specific
		expect(result[0]).toBe('USD');
		expect(result[1]).toBe('AUD');
		expect(result[2]).toBe('EUR');

		//Proper Way - check for the existance of an element in this array
		expect(result).toContain('USD');
		expect(result).toContain('AUD');
		expect(result).toContain('EUR');

		//Ideal way
		expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
	});
});

// Testing objects
describe('getProduct', () => {
	it('Should return the product with the given id', () => {
		const result = lib.getProduct(1);
		//expect(result).toEqual({ id: 1, price: 10 });
		//toMatchObject takes a few object and will always pass, not to specific
		expect(result).toMatchObject({ id: 1, price: 10 });

		expect(result).toHaveProperty('id', 1);
	});
});

// Testing exceptions
describe('registerUser', () => {
	it('Should throw if username if falsy', () => {
		const args = [null, undefined, NaN, '', 0, false];
		args.forEach((a) => {
			expect(() => {
				lib.registerUser(a);
			}).toThrow();
		});
	});

	it('Should return a user object if valid username is passed', () => {
		const result = lib.registerUser('Chris');
		//These 2 expects are logicals about a single concept i.e result
		expect(result).toMatchObject({ username: 'Chris' });
		expect(result.id).toBeGreaterThan(0);
	});
});

// Mock functions
describe('applyDiscount', () => {
	it('Should apply 10% discount if customer has more than 10 points', () => {
		db.getCustomerSync = function (customerId) {
			console.log('Fake reading customer...');
			return { id: customerId, points: 20 };
		};

		const order = { customerId: 1, totalPrice: 10 };
		lib.applyDiscount(order);
		expect(order.totalPrice).toBe(9);
	});
});

describe('notifyCustomer', () => {
	it('Should send an email to the customer', () => {
		db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
		// db.getCustomerSync = function (customerId) {
		// 			return { email: 'a' };
		// 		};

		mail.send = jest.fn();
		// let mailSent = false;
		// mail.send = function (email, message) {
		// 	mailSent = true;
		// };

		lib.notifyCustomer({ customerId: 1 });

		expect(mail.send).toHaveBeenCalled();
		expect(mail.send.mock.calls[0][0]).toBe('a');
		expect(mail.send.mock.calls[0][1]).toMatch(/order/);
		//toHaveBeenCalledWith works best when the args are not strings but number, boolean ...
	});
});
