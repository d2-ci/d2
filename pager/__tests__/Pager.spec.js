"use strict";

var _Pager = _interopRequireDefault(require("../Pager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

describe('Pager', function () {
  var pagerFixtureOne;
  var pageFixtureTwo;
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _Pager.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  describe('instance without data', function () {
    var pager;
    beforeEach(function () {
      pager = new _Pager.default();
    });
    it('should set the page to first', function () {
      expect(pager.page).toBe(1);
    });
    it('should set the total page count to 1', function () {
      expect(pager.pageCount).toBe(1);
    });
    it('should set the total item count to undefined', function () {
      expect(pager.total).toBeUndefined();
    });
    it('should not set the nextPage', function () {
      expect(pager.nextPage).toBeUndefined();
    });
    it('should not set the prevPage', function () {
      expect(pager.prevPage).toBeUndefined();
    });
  });
  describe('instance with data', function () {
    var pager;
    var modelDefinition;
    beforeEach(function () {
      pagerFixtureOne = {
        page: 1,
        pageCount: 37,
        total: 1844,
        nextPage: 'http://localhost:8080/dhis/api/dataElements?page=2'
      };
      pageFixtureTwo = {
        page: 3,
        pageCount: 37,
        total: 1844,
        nextPage: 'http://localhost:8080/dhis/api/dataElements?page=4',
        prevPage: 'http://localhost:8080/dhis/api/dataElements?page=2'
      };

      var ModelDefinition = function ModelDefinition() {
        _classCallCheck(this, ModelDefinition);
      };

      ModelDefinition.prototype.list = jest.fn().mockReturnValue(Promise.resolve());
      modelDefinition = new ModelDefinition();
      pager = new _Pager.default(pagerFixtureOne, modelDefinition);
    });
    it('should be an instance of Pager', function () {
      expect(pager).toBeInstanceOf(_Pager.default);
    });
    it('should have a total item count', function () {
      expect(pager.total).toBe(1844);
    });
    it('should have the current page number', function () {
      expect(pager.page).toBe(1);
    });
    it('should have a pageCount', function () {
      expect(pager.pageCount).toBe(37);
    });
    it('should have a nextPage url', function () {
      expect(pager.nextPage).toBe('http://localhost:8080/dhis/api/dataElements?page=2');
    });
    it('should have previous page', function () {
      pager = new _Pager.default(pageFixtureTwo);
      expect(pager.prevPage).toBe('http://localhost:8080/dhis/api/dataElements?page=2');
    });
    describe('hasNextPage', function () {
      it('should be a function', function () {
        expect(pager.hasNextPage).toBeInstanceOf(Function);
      });
      it('should return true if there is a next page', function () {
        expect(pager.hasNextPage()).toBe(true);
      });
      it('should return false if there is no next page', function () {
        delete pager.nextPage;
        expect(pager.hasNextPage()).toBe(false);
      });
    });
    describe('hasPreviousPage', function () {
      it('should be a function', function () {
        expect(pager.hasPreviousPage).toBeInstanceOf(Function);
      });
      it('should return true if there is a previous page', function () {
        pager.prevPage = 'some link to a page';
        expect(pager.hasPreviousPage()).toBe(true);
      });
      it('should return false if there is no previous page', function () {
        expect(pager.hasPreviousPage()).toBe(false);
      });
    });
    describe('nextPage', function () {
      it('should be a method on the collection', function () {
        expect(pager.getNextPage).toBeInstanceOf(Function);
      });
      it('should return a promise', function () {
        expect(pager.getNextPage()).toBeInstanceOf(Promise);
      });
      it('should call the model definition for a new list', function () {
        pager.getNextPage();
        expect(modelDefinition.list).toBeCalled();
      });
      it('should only ask for a new list if the pager has a nextPage property', function () {
        delete pager.nextPage;
        return pager.getNextPage().catch(function () {
          expect(modelDefinition.list).not.toHaveBeenCalled();
        });
      });
      it('should return a rejected promise if there are no more new pages', function () {
        delete pager.nextPage;
        return pager.getNextPage().catch(function (message) {
          expect(message).toBe('There is no next page for this collection');
        });
      });
      it('should call next page with the current page number + 1', function () {
        pager.getNextPage();
        expect(modelDefinition.list).toBeCalledWith({
          page: 2
        });
      });
    });
    describe('previousPage', function () {
      it('should be a method on the collection', function () {
        expect(pager.getPreviousPage).toBeInstanceOf(Function);
      });
      it('should return a promise', function () {
        expect(pager.getPreviousPage()).toBeInstanceOf(Promise);
      });
      it('should ask for the previous page if the prevPage property is set', function () {
        pager.page = 2;
        pager.prevPage = 'http://url.to.the.next.page';
        pager.getPreviousPage();
        expect(modelDefinition.list).toBeCalled();
      });
      it('should not ask for a new list if there is no previous page', function () {
        expect(modelDefinition.list).not.toHaveBeenCalled();
      });
      it('should return a rejected promise if there are no more previous pages', function () {
        return pager.getPreviousPage().catch(function (message) {
          expect(message).toBe('There is no previous page for this collection');
        });
      });
      it('should call the list method with the current page number - 1', function () {
        pager.page = 3;
        pager.prevPage = 'http://url.to.the.next.page';
        pager.getPreviousPage();
        expect(modelDefinition.list).toBeCalledWith({
          page: 2
        });
      });
    });
    describe('goToPage', function () {
      it('should call the list method with the passed page number', function () {
        pager.goToPage(2);
        expect(modelDefinition.list).toBeCalledWith({
          page: 2
        });
      });
      it('should throw an error when the page is less than 1', function () {
        expect(function () {
          return pager.goToPage(0);
        }).toThrowError('PageNr can not be less than 1');
        expect(function () {
          return pager.goToPage(-1);
        }).toThrowError('PageNr can not be less than 1');
      });
      it('should throw an error when the page is larger than the pagecount', function () {
        expect(function () {
          return pager.goToPage(38);
        }).toThrowError('PageNr can not be larger than the total page count of 37');
        expect(function () {
          return pager.goToPage(100);
        }).toThrowError('PageNr can not be larger than the total page count of 37');
      });
    });
    describe('should throw error when there is no page handler', function () {
      it('should throw an error when no handler is specified', function (done) {
        pager = new _Pager.default(pagerFixtureOne);
        pager.getNextPage().then(done).catch(function () {
          done();
        });
      });
    });
  });
  describe('instance with data and query parameters', function () {
    var pager;
    var modelDefinition;
    beforeEach(function () {
      pagerFixtureOne = {
        page: 1,
        pageCount: 37,
        query: {
          fields: ':all'
        },
        total: 1844,
        nextPage: 'http://localhost:8080/dhis/api/dataElements?page=2l'
      };
      pageFixtureTwo = {
        page: 3,
        pageCount: 37,
        total: 1844,
        nextPage: 'http://localhost:8080/dhis/api/dataElements?page=4',
        prevPage: 'http://localhost:8080/dhis/api/dataElements?page=2'
      };

      var ModelDefinition = function ModelDefinition() {
        _classCallCheck(this, ModelDefinition);
      };

      ModelDefinition.prototype.list = jest.fn().mockReturnValue(Promise.resolve());
      modelDefinition = new ModelDefinition();
      pager = new _Pager.default(pagerFixtureOne, modelDefinition, {
        fields: ':all'
      });
    });
    describe('nextPage', function () {
      it('should include the current query parameters', function () {
        pager.getNextPage();
        expect(modelDefinition.list).toBeCalledWith({
          page: 2,
          fields: ':all'
        });
      });
    });
    describe('previousPage', function () {
      it('should include the current query parameters', function () {
        pager.page = 3;
        pager.prevPage = 'http://url.to.the.next.page';
        pager.getPreviousPage();
        expect(modelDefinition.list).toBeCalledWith({
          page: 2,
          fields: ':all'
        });
      });
    });
    describe('goToPage', function () {
      it('should call the list method with the current query parameters', function () {
        pager.goToPage(2);
        expect(modelDefinition.list).toBeCalledWith({
          page: 2,
          fields: ':all'
        });
      });
    });
  });
});
//# sourceMappingURL=Pager.spec.js.map