describe('Lowercase', function() {
  var lowercase = STATES.lowercase;

  it('should lowercase capitalized words', function() {
    expect(lowercase('Lower')).to.equal('lower');
    expect(lowercase('123Go')).to.equal('123go');
  });


  describe('Weird cases', function() {
    it('should accept null but stringify the result', function() {
      expect(lowercase(null)).to.equal('null');
    });

    it('should accept true but stringify the result', function() {
      expect(lowercase(true)).to.equal('true');
    });

    it('should accept false but stringify the result', function() {
      expect(lowercase(false)).to.equal('false');
    });

    it('should not explode when given numbers', function() {
      expect(lowercase(123)).to.equal('123');
      expect(lowercase(4e0)).to.equal('4');
      expect(lowercase('0123')).to.equal('0123');
      expect(lowercase(0001)).to.equal('1');
    });

    it('should not explode when given a date (not undefined)', function() {
      expect(lowercase(new Date())).to.not.be.undefined;
    });
    it('should not explode when given null', function() {});
  });
});