describe('De-capitalize', function() {
  var decap = STATES.decapitalize;

  it('should de-capitalize lowercase words', function() {
    expect(decap('I am here')).to.equal('i am here');
  });

});