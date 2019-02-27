"use strict";

var _Model2 = _interopRequireDefault(require("../Model"));

var _ModelDefinition = _interopRequireDefault(require("../ModelDefinition"));

var _Pager = _interopRequireDefault(require("../../../src/pager/Pager"));

var _ModelCollection = _interopRequireDefault(require("../ModelCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

jest.mock('../Model');
jest.mock('../../../src/pager/Pager');
describe('ModelCollection', function () {
  var mockSchema = {
    singular: 'mock',
    plural: 'mocks'
  };
  var mockModelDefinition = new _ModelDefinition.default(mockSchema, []);
  var pagerObject;
  beforeEach(function () {
    pagerObject = {
      page: 1,
      pageCount: 10,
      total: 482,
      nextPage: 'http://localhost:8080/dhis/api/dataElements?page=2'
    };

    _Pager.default.mockReset();

    _Pager.default.mockReturnValueOnce(pagerObject);
  });
  describe('extension of Map', function () {
    var firstValue;
    var modelCollection;
    beforeEach(function () {
      firstValue = new _Model2.default(mockModelDefinition);
      firstValue.id = 'q2egwkkrfco';
      modelCollection = _ModelCollection.default.create(mockModelDefinition, [], pagerObject);
      modelCollection.add(firstValue);
    });
    it('should have a clear method that clears the list', function () {
      modelCollection.clear();
      expect(modelCollection.size).toBe(0);
    });
    it('should get the values', function () {
      expect(Array.from(modelCollection.values())[0]).toBe(firstValue);
    });
    it('should get the keys', function () {
      expect(Array.from(modelCollection.keys())[0]).toBe('q2egwkkrfco');
    });
    it('should get the entries', function () {
      expect(modelCollection.entries().next().value).toEqual([firstValue.id, firstValue]);
    });
    it('should run the forEach with the correct values', function () {
      var forEachFunc = jest.fn();
      modelCollection.forEach(forEachFunc);
      expect(forEachFunc).toBeCalledWith(firstValue, 'q2egwkkrfco', modelCollection.valuesContainerMap);
    });
    it('should remove the correct value', function () {
      modelCollection.delete('q2egwkkrfco');
      expect(modelCollection.size).toBe(0);
    });
    it('should get the entries', function () {
      expect(Array.from(modelCollection)[0]).toEqual(['q2egwkkrfco', firstValue]);
    });
    it('should return true when the entry is in the collection', function () {
      expect(modelCollection.has('q2egwkkrfco')).toBe(true);
    });
    it('should return the correct value on get', function () {
      expect(modelCollection.get('q2egwkkrfco')).toBe(firstValue);
    });
    it('should throw error when trying to set the size', function () {
      expect(function () {
        modelCollection.size = 0;
      }).toThrowError();
    });
  });
  it('should be an object', function () {
    expect(_ModelCollection.default).toBeInstanceOf(Function);
  });
  it('should accept 3 arguments', function () {
    expect(_ModelCollection.default.length).toBe(3);
  });
  describe('class', function () {
    describe('create method', function () {
      it('should be a function', function () {
        expect(_ModelCollection.default.create).toBeInstanceOf(Function);
      });
      it('should return an instance of the class', function () {
        expect(_ModelCollection.default.create(mockModelDefinition)).toBeInstanceOf(_ModelCollection.default);
      });
      it('should instantiate a new pager', function () {
        var collection = _ModelCollection.default.create(mockModelDefinition);

        expect(collection.pager).toBeDefined();
      });
      it('should not be allowed to be called without new', function () {
        expect(function () {
          return (0, _ModelCollection.default)();
        }).toThrowErrorMatchingSnapshot();
      });
    });
    describe('throwIfContainsOtherThanModelObjects', function () {
      it('should throw when one of the the passed values in the array is not a Model', function () {
        expect(function () {
          return _ModelCollection.default.throwIfContainsOtherThanModelObjects([{}]);
        }).toThrowError('Values of a ModelCollection must be instances of Model');
      });
      it('should not throw when the passed value is a model', function () {
        expect(function () {
          return _ModelCollection.default.throwIfContainsOtherThanModelObjects([new _Model2.default(mockModelDefinition)]);
        }).not.toThrowError();
      });
    });
    describe('throwIfContainsModelWithoutUid', function () {
      it('should throw when the passed array contains a modelWithoutId', function () {
        expect(function () {
          return _ModelCollection.default.throwIfContainsModelWithoutUid([new _Model2.default(mockModelDefinition)]);
        }).toThrowError('Can not add a Model without id to a ModelCollection');
      });
      it('should accept models with valid UIDs', function () {
        var model = new _Model2.default(mockModelDefinition);
        model.id = 'FQ2o8UBlcrS';
        expect(function () {
          return _ModelCollection.default.throwIfContainsModelWithoutUid([model]);
        }).not.toThrowError();
      });
    });
  });
  describe('instance', function () {
    var modelDefinition;
    var modelCollection;
    var mockyModel1;
    var mockyModel2;
    var mockyModel3;
    beforeEach(function () {
      modelDefinition = new _ModelDefinition.default(mockSchema, []);
      modelCollection = new _ModelCollection.default(modelDefinition);
      mockyModel1 = new _Model2.default(mockModelDefinition);
      mockyModel1.id = 'q2egwkkrfc1';
      mockyModel2 = new _Model2.default(mockModelDefinition);
      mockyModel2.id = 'q2egwkkrfc2';
      mockyModel3 = new _Model2.default(mockModelDefinition);
      mockyModel3.id = 'q2egwkkrfc3';
    });
    it('should throw if being constructed with non Model values', function () {
      expect(function () {
        return new _ModelCollection.default(modelDefinition, [1, 2, 3]);
      }).toThrowError('Values of a ModelCollection must be instances of Model');
    });
    it('should accept an array of Model objects', function () {
      modelCollection = new _ModelCollection.default(modelDefinition, [mockyModel1, mockyModel2, mockyModel3]);
      expect(modelCollection.size).toBe(3);
    });
    it('should not add the same model twice', function () {
      modelCollection = new _ModelCollection.default(modelDefinition, [mockyModel1, mockyModel1]);
      expect(modelCollection.size).toBe(1);
    });
    it('should return the first Model', function () {
      var firstModel = mockyModel1;
      mockyModel2.id = firstModel.id;
      modelCollection = new _ModelCollection.default(modelDefinition, [firstModel, mockyModel2]);
      var firstValue = modelCollection.get('q2egwkkrfc1');
      expect(modelCollection.size).toBe(1);
      expect(firstValue.id).toBe('q2egwkkrfc1');
      expect(firstValue).toBeInstanceOf(_Model2.default);
    });
    it('should set the modelDefinition onto the modelCollection', function () {
      expect(modelCollection.modelDefinition).toBe(modelDefinition);
    });
    describe('add', function () {
      it('should accept Model as a value', function () {
        modelCollection.add(mockyModel1);
      });
      it('should not accept a number', function () {
        expect(function () {
          return modelCollection.add(1);
        }).toThrowError('Values of a ModelCollection must be instances of Model');
      });
      it('should not accept an empty object', function () {
        expect(function () {
          return modelCollection.add({});
        }).toThrowError('Values of a ModelCollection must be instances of Model');
      });
      it('should not accept an object that was created based on a local class', function () {
        var Model = // eslint-disable-line no-shadow
        function Model(id) {
          _classCallCheck(this, Model);

          this.id = id;
        };

        expect(function () {
          return modelCollection.add(new Model('q2egwkkrfco'));
        }).toThrowError('Values of a ModelCollection must be instances of Model');
      });
      it('should accept an object that was create with Model as subclass', function () {
        var MyModel =
        /*#__PURE__*/
        function (_Model) {
          _inherits(MyModel, _Model);

          function MyModel() {
            _classCallCheck(this, MyModel);

            return _possibleConstructorReturn(this, _getPrototypeOf(MyModel).apply(this, arguments));
          }

          return MyModel;
        }(_Model2.default);

        var myModel = new MyModel(mockModelDefinition);
        myModel.id = 'q2egwkkrfco';
        expect(function () {
          return modelCollection.add(myModel);
        }).not.toThrowError('Values of a ModelCollection must be instances of Model');
        expect(modelCollection.size).toBe(1);
      });
      it('should throw if the id is not available', function () {
        expect(function () {
          return modelCollection.add(new _Model2.default(mockModelDefinition));
        }).toThrowError('Can not add a Model without id to a ModelCollection');
      });
    });
    describe('toArray', function () {
      it('should return an array of the items', function () {
        var modelArray = [mockyModel1, mockyModel2];
        modelCollection = new _ModelCollection.default(modelDefinition, modelArray);
        expect(modelCollection.toArray()).toEqual(modelArray);
      });
    });
  });
});
//# sourceMappingURL=ModelCollection.spec.js.map