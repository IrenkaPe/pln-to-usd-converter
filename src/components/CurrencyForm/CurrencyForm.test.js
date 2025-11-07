
    import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  const testCases = [
    { amount: '100', from: 'PLN', to: 'USD' },
    { amount: '20', from: 'USD', to: 'PLN' },
    { amount: '200', from: 'PLN', to: 'USD' },
    { amount: '345', from: 'USD', to: 'PLN' },
  ];

  for (const testCase of testCases) {
    it(`should run action with ${testCase.amount} ${testCase.from} to ${testCase.to}`, () => {
      const action = jest.fn();

      // render component
      render(<CurrencyForm action={action} />);

      // find elements
      const submitButton = screen.getByText('Convert');
      const amountField = screen.getByTestId('amount');
      const fromField = screen.getByTestId('from-select');
      const toField = screen.getByTestId('to-select');

      // set test values to fields
      userEvent.type(amountField, testCase.amount);
      userEvent.selectOptions(fromField, testCase.from);
      userEvent.selectOptions(toField, testCase.to);

      // simulate user click on "convert" button
      userEvent.click(submitButton);

      // check if action callback was called once and with proper argument
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({
        amount: parseInt(testCase.amount, 10),
        from: testCase.from,
        to: testCase.to,
      });

      cleanup();
    });
  }
});
    