describe('waitstaffCalc', function () {

	describe("index", function () {
		it("should display the correct title", function () {

			browser.get('/#');
			expect(browser.getTitle()).toBe('Waitstaff Calculator');
		});

		it("should display customer charges when input is valid", function(){

			browser.get('/#');
			element(by.model('input.mealPrice')).sendKeys('100');
			element(by.model('input.taxRate')).sendKeys('5');
			element(by.model('input.tipPercentage')).sendKeys('15');
			element(by.id('submit')).click().then(function() {
				expect(element(by.model('output.subtotal')).getText()).toBe('105');
				expect(element(by.model('output.tip')).getText()).toBe('15');
				expect(element(by.model('output.total')).getText()).toBe('120');
			});


		});

	});
});