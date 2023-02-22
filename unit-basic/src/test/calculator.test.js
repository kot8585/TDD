const Calculator = require('../calculator.js');

describe('Calculator', () => {
  let cal;
  beforeEach(() => {
    cal = new Calculator();
  });
  
  it('inits with 0', () => {
    expect(cal.value).toBe(0);
  });

  it('set value', () => {
    cal.set(1);
    expect(cal.value).toBe(1);
  })

  it('clear is 0', ()=> {
    cal.set(5);
    cal.clear();
    expect(cal.value).toBe(0);
  })

  it('add', () => {
    cal.add(2);
    expect(cal.value).toBe(2);
  })

  it('add should throw an error if value is greater than 100', () => {
      expect(() =>{cal.add(101)}).toThrow('Value can not be greater than 100');
  });

  describe('divides', () => {
    it('divide', () => {
      cal.divide(1);
      expect(cal.value).toBe(0);
    });

    it('1 / 0 === Infinity', () => {
      cal.set(1);
      cal.divide(0);
      expect(cal.value).toBe(Infinity);
    });

    it('1 / -0 === Infinity', () => {
      cal.set(5);
      cal.divide(-0);
      expect(cal.value).toBe(-Infinity);
    });

    it('0 / 0 === NaN', () => {
      cal.divide(0);
      expect(cal.value).toBe(NaN);
    })
  });
})






