describe('Capitalize', function() {
  var capitalize = STATES.capitalize;

  it('should capitalize lowercase words', function() {
    expect(capitalize('lower')).to.equal('Lower');
  });

  it('should capitalize Capitalized words', function() {
    expect(capitalize('Lower')).to.equal('Lower');
  });

  it('should capitalize CAPPED words', function() {
    expect(capitalize('LOWER')).to.equal('LOWER');
  });
});