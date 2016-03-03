'use strict';

describe('Decisions E2E Tests:', function () {
  describe('Test Decisions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/decisions');
      expect(element.all(by.repeater('decision in decisions')).count()).toEqual(0);
    });
  });
});
