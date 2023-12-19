const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(!!dic, true);
        });
        it ('некорректные пары - возвращает undefined', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(dic.set(null, null), undefined);
            assert.strictEqual(dic.set(undefined, undefined), undefined);
            assert.strictEqual(dic.set(undefined, null), undefined);
            assert.strictEqual(dic.set(null, undefined), undefined);
            assert.strictEqual(dic.set("hello", undefined), undefined);
            assert.strictEqual(dic.set(undefined, "hello"), undefined);
            assert.strictEqual(dic.set("hello", null), undefined);
            assert.strictEqual(dic.set(null, "hello"), undefined);
            assert.strictEqual(dic.set([1, 2, 3], "hello"), undefined);
            assert.strictEqual(dic.set([1, 2, 3], [1, 2, 3]), undefined);
        });
        const dic = new core.Dictionary();
        it ('корректные пары', () => {
            assert.strictEqual(dic.set('animal', 'mammals'), true);
            assert.strictEqual(dic.set('mammals', 'cat'), true);
        });
        it ('получение по существующему ключу', () => {
            assert.strictEqual(dic.get('animal'), 'mammals');
            assert.strictEqual(dic.get('mammals'), 'cat');
        });
        it ('получение по несуществующему ключу', () => {
            assert.strictEqual(dic.get('frog'), undefined);
            assert.strictEqual(dic.get('color'), undefined);
        });
    });
});