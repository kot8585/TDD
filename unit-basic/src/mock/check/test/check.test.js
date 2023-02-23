const check = require('../check');

const mockCallback = jest.fn(() => true);
//어떤 걸 mock으로 정해야 하는거야? 
test('check', () => {
  expect(check(mockCallback, (value) => value, value => value)).toBe('yes');
})

describe('check', () => {
  let onSuccess;
  let onFail;

  beforeEach(() => {
    onSuccess = jest.fn();
    onFail = jest.fn();
  });

  it('should call onSuccess when predicate is true', () => {
    check(() => true, onSuccess, onFail);
    // expect(onSuccess.mock.calls).toHaveLength(1);
    expect(onSuccess).toHaveBeenCalledTimes(1); //위의 코드를 더 쉽게 볼 수 있도록 해준다. 

    //onSuccess가 첫번째로 호출해서 첫번째로 리턴된 값
    // expect(onSuccess.mock.calls[0][0]).toBe('yes');
    expect(onSuccess).toHaveBeenCalledWith('yes');
    expect(onFail.mock.calls).toHaveLength(0);
  });

    it('should call onFail when predicate is false', () => {
    check(() => false, onSuccess, onFail);

    expect(onFail).toHaveBeenCalledWith('no');
    expect(onFail).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(0);
  });
})

