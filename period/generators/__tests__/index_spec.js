"use strict";

var _ = require("..");

var daily = _interopRequireWildcard(require("../daily"));

var weekly = _interopRequireWildcard(require("../weekly"));

var monthly = _interopRequireWildcard(require("../monthly"));

var bimonthly = _interopRequireWildcard(require("../bi-monthly"));

var quarterly = _interopRequireWildcard(require("../quarterly"));

var sixmonthly = _interopRequireWildcard(require("../six-monthly"));

var sixmonthlyapril = _interopRequireWildcard(require("../six-monthly-april"));

var yearly = _interopRequireWildcard(require("../yearly"));

var financialoctober = _interopRequireWildcard(require("../financial-october"));

var financialjuly = _interopRequireWildcard(require("../financial-july"));

var financialapril = _interopRequireWildcard(require("../financial-april"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

describe('generators', function () {
  describe('createPeriodGeneratorsForLocale()', function () {
    describe('daily', function () {
      beforeEach(function () {
        jest.spyOn(daily, 'generateDailyPeriodsForYear');
      });
      afterEach(function () {
        daily.generateDailyPeriodsForYear.mockRestore();
      });
      it('should have the daily period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateDailyPeriodsForYear)).toBe('function');
      });
      it('should call the the daily generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateDailyPeriodsForYear(2017);
        expect(daily.generateDailyPeriodsForYear).toBeCalledWith(2017, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateDailyPeriodsForYear(2017);
        expect(generators.generateDailyPeriodsForYear(2017)).toEqual(daily.generateDailyPeriodsForYear(2017, 'nl'));
      });
    });
    describe('weekly', function () {
      beforeEach(function () {
        jest.spyOn(weekly, 'generateWeeklyPeriodsForYear');
      });
      afterEach(function () {
        weekly.generateWeeklyPeriodsForYear.mockRestore();
      });
      it('should have the weekly period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateWeeklyPeriodsForYear)).toBe('function');
      });
      it('should call the weekly generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateWeeklyPeriodsForYear(2017);
        expect(weekly.generateWeeklyPeriodsForYear).toBeCalledWith(2017, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateWeeklyPeriodsForYear(2017);
        expect(generators.generateWeeklyPeriodsForYear(2017)).toEqual(weekly.generateWeeklyPeriodsForYear(2017, 'nl'));
      });
    });
    describe('monthly', function () {
      beforeEach(function () {
        jest.spyOn(monthly, 'generateMonthlyPeriodsForYear');
      });
      afterEach(function () {
        monthly.generateMonthlyPeriodsForYear.mockRestore();
      });
      it('should have the weekly period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateMonthlyPeriodsForYear)).toBe('function');
      });
      it('should call the weekly generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateMonthlyPeriodsForYear(2017);
        expect(monthly.generateMonthlyPeriodsForYear).toBeCalledWith(2017, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateMonthlyPeriodsForYear(2017);
        expect(generators.generateMonthlyPeriodsForYear(2017)).toEqual(monthly.generateMonthlyPeriodsForYear(2017, 'nl'));
      });
    });
    describe('bi-monthly', function () {
      beforeEach(function () {
        jest.spyOn(bimonthly, 'generateBiMonthlyPeriodsForYear');
      });
      afterEach(function () {
        bimonthly.generateBiMonthlyPeriodsForYear.mockRestore();
      });
      it('should have the weekly period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateBiMonthlyPeriodsForYear)).toBe('function');
      });
      it('should call the weekly generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateBiMonthlyPeriodsForYear(2017);
        expect(bimonthly.generateBiMonthlyPeriodsForYear).toBeCalledWith(2017, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateBiMonthlyPeriodsForYear(2017);
        expect(generators.generateBiMonthlyPeriodsForYear(2017)).toEqual(bimonthly.generateBiMonthlyPeriodsForYear(2017, 'nl'));
      });
    });
    describe('quarterly', function () {
      beforeEach(function () {
        jest.spyOn(quarterly, 'generateQuarterlyPeriodsForYear');
      });
      afterEach(function () {
        quarterly.generateQuarterlyPeriodsForYear.mockRestore();
      });
      it('should have the weekly period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateQuarterlyPeriodsForYear)).toBe('function');
      });
      it('should call the weekly generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateQuarterlyPeriodsForYear(2017);
        expect(quarterly.generateQuarterlyPeriodsForYear).toBeCalledWith(2017, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateQuarterlyPeriodsForYear(2017);
        expect(generators.generateQuarterlyPeriodsForYear(2017)).toEqual(quarterly.generateQuarterlyPeriodsForYear(2017, 'nl'));
      });
    });
    describe('six-monthly', function () {
      beforeEach(function () {
        jest.spyOn(sixmonthly, 'generateSixMonthlyPeriodsForYear');
      });
      afterEach(function () {
        sixmonthly.generateSixMonthlyPeriodsForYear.mockRestore();
      });
      it('should have the weekly period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateSixMonthlyPeriodsForYear)).toBe('function');
      });
      it('should call the weekly generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateSixMonthlyPeriodsForYear(2017);
        expect(sixmonthly.generateSixMonthlyPeriodsForYear).toBeCalledWith(2017, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateSixMonthlyPeriodsForYear(2017);
        expect(generators.generateSixMonthlyPeriodsForYear(2017)).toEqual(sixmonthly.generateSixMonthlyPeriodsForYear(2017, 'nl'));
      });
    });
    describe('six-monthly-april', function () {
      beforeEach(function () {
        jest.spyOn(sixmonthlyapril, 'generateSixMonthlyAprilPeriodsForYear');
      });
      afterEach(function () {
        sixmonthlyapril.generateSixMonthlyAprilPeriodsForYear.mockRestore();
      });
      it('should have the weekly period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateSixMonthlyPeriodsForYear)).toBe('function');
      });
      it('should call the weekly generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateSixMonthlyAprilPeriodsForYear(2017);
        expect(sixmonthlyapril.generateSixMonthlyAprilPeriodsForYear).toBeCalledWith(2017, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateSixMonthlyAprilPeriodsForYear(2017);
        expect(generators.generateSixMonthlyAprilPeriodsForYear(2017)).toEqual(sixmonthlyapril.generateSixMonthlyAprilPeriodsForYear(2017, 'nl'));
      });
    });
    describe('yearly', function () {
      beforeEach(function () {
        jest.spyOn(yearly, 'generateYearlyPeriodsUpToYear');
      });
      afterEach(function () {
        yearly.generateYearlyPeriodsUpToYear.mockRestore();
      });
      it('should have the weekly period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateYearlyPeriodsUpToYear)).toBe('function');
      });
      it('should call the weekly generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateYearlyPeriodsUpToYear(2017);
        expect(yearly.generateYearlyPeriodsUpToYear).toBeCalledWith(2017, undefined, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateYearlyPeriodsUpToYear(2017);
        expect(generators.generateYearlyPeriodsUpToYear(2017, 10)).toEqual(yearly.generateYearlyPeriodsUpToYear(2017, 10, 'nl'));
      });
    });
    describe('yearly', function () {
      beforeEach(function () {
        jest.spyOn(yearly, 'generateYearlyPeriodsUpToYear');
      });
      afterEach(function () {
        yearly.generateYearlyPeriodsUpToYear.mockRestore();
      });
      it('should have the weekly period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateYearlyPeriodsUpToYear)).toBe('function');
      });
      it('should call the weekly generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateYearlyPeriodsUpToYear(2017);
        expect(yearly.generateYearlyPeriodsUpToYear).toBeCalledWith(2017, undefined, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateYearlyPeriodsUpToYear(2017);
        expect(generators.generateYearlyPeriodsUpToYear(2017, 10)).toEqual(yearly.generateYearlyPeriodsUpToYear(2017, 10, 'nl'));
      });
    });
    describe('financial-october', function () {
      beforeEach(function () {
        jest.spyOn(financialoctober, 'generateFinancialOctoberPeriodsUpToYear');
      });
      afterEach(function () {
        financialoctober.generateFinancialOctoberPeriodsUpToYear.mockRestore();
      });
      it('should have the weekly period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateFinancialOctoberPeriodsUpToYear)).toBe('function');
      });
      it('should call the weekly generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateFinancialOctoberPeriodsUpToYear(2017);
        expect(financialoctober.generateFinancialOctoberPeriodsUpToYear).toBeCalledWith(2017, undefined, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateFinancialOctoberPeriodsUpToYear(2017);
        expect(generators.generateFinancialOctoberPeriodsUpToYear(2017, 5)).toEqual(financialoctober.generateFinancialOctoberPeriodsUpToYear(2017, 5, 'nl'));
      });
    });
    describe('financial-july', function () {
      beforeEach(function () {
        jest.spyOn(financialjuly, 'generateFinancialJulyPeriodsUpToYear');
      });
      afterEach(function () {
        financialjuly.generateFinancialJulyPeriodsUpToYear.mockRestore();
      });
      it('should have the weekly period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateFinancialJulyPeriodsUpToYear)).toBe('function');
      });
      it('should call the weekly generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateFinancialJulyPeriodsUpToYear(2017);
        expect(financialjuly.generateFinancialJulyPeriodsUpToYear).toBeCalledWith(2017, undefined, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateFinancialJulyPeriodsUpToYear(2017);
        expect(generators.generateFinancialJulyPeriodsUpToYear(2017, 5)).toEqual(financialjuly.generateFinancialJulyPeriodsUpToYear(2017, 5, 'nl'));
      });
    });
    describe('financial-april', function () {
      beforeEach(function () {
        jest.spyOn(financialapril, 'generateFinancialAprilPeriodsUpToYear');
      });
      afterEach(function () {
        financialapril.generateFinancialAprilPeriodsUpToYear.mockRestore();
      });
      it('should have the weekly period generator', function () {
        expect(_typeof((0, _.createPeriodGeneratorsForLocale)('nl').generateFinancialAprilPeriodsUpToYear)).toBe('function');
      });
      it('should call the weekly generator with the correct locale', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateFinancialAprilPeriodsUpToYear(2017);
        expect(financialapril.generateFinancialAprilPeriodsUpToYear).toBeCalledWith(2017, undefined, 'nl');
      });
      it('should return the same result as when calling the generator directly', function () {
        var generators = (0, _.createPeriodGeneratorsForLocale)('nl');
        generators.generateFinancialAprilPeriodsUpToYear(2017);
        expect(generators.generateFinancialAprilPeriodsUpToYear(2017, 5)).toEqual(financialapril.generateFinancialAprilPeriodsUpToYear(2017, 5, 'nl'));
      });
    });
  });
  describe('default values', function () {
    beforeEach(function () {
      jest.spyOn(daily, 'generateDailyPeriodsForYear');
    });
    it('should use the default locale when no locale is passed', function () {
      var generators = (0, _.createPeriodGeneratorsForLocale)();
      generators.generateDailyPeriodsForYear(2017);
      expect(daily.generateDailyPeriodsForYear).toBeCalledWith(2017, 'en');
    });
  });
});
//# sourceMappingURL=index_spec.js.map