(function () {
    'use strict';
    var expect = require('expect.js');
    var ColumnMapper = require('../../src/ColumnMapper.js');

    describe('for simple column mappings', function(){
        describe('ínteger mapper', function() {
            it('maps integers', function() {
                var mapper = new ColumnMapper({
                    aColumn: 'int'
                });

                expect(mapper.map('aColumn', '1234')).to.a('number');
            });

            it('maps the value', function() {
                var mapper = new ColumnMapper({
                    aColumn: 'int'
                });

                expect(mapper.map('aColumn', '1234')).to.be(1234);
            });
        });

        describe('extractNumber mapper', function() {
            it('extracts numbers from the string', function() {
                var mapper = new ColumnMapper({
                    aColumn: 'extractNumber'
                });

                expect(mapper.map('aColumn', '1234 eps')).to.be('1234');
            });
        });
    });

    describe('for custom mapping functions', function() {
        it('returns the result of the custom mapper', function() {
            var mapper = new ColumnMapper({
                aColumn: function(value) {
                    return value + 'e';
                }
            });

            expect(mapper.map('aColumn', 'abcd')).to.be('abcde');
        });
    });

    describe('applies multiple mapping functions', function() {
        it('results the result of an array using the int mapper', function() {
            var mapper = new ColumnMapper({
                aColumn: ['int']
            });

            expect(mapper.map('aColumn', '1234')).to.be(1234);
        });

        it('extractNumber and then int mappers return an integer from a mixed string', function() {
            var mapper = new ColumnMapper({
                aColumn: ['extractNumber', 'int']
            });

            expect(mapper.map('aColumn', '1234 eps')).to.be(1234);
        });

        it('maps integer value then executes a custom mapper', function() {
            var mapper = new ColumnMapper({
                aColumn: ['int', function(i) {
                    return i * 2;
                }]
            });

            expect(mapper.map('aColumn', '2')).to.be(4);
        });
    });
})();
