'use strict';

describe('Values E2E Tests:', function () {
  describe('Test Values page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/values');
      expect(element.all(by.repeater('value in values')).count()).toEqual(0);
    });
  });
});
