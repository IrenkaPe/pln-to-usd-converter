import ResultBox from './ResultBox';
import {render,screen} from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'; 

  describe('Component ResultBox', () => {

   it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

   it( 'should render proper info about conversion when PLN -> USD',() => {
    render(<ResultBox from ="PLN" to="USD" amount={100}/>);

    const resultDiv = screen.getByTestId('result-box');
    expect(resultDiv).toHaveTextContent('PLN 100.00 = $28.57')
  });

   const plnToUsdCases = [
  { amount: 100, expected: 'PLN 100.00 = $28.57' },
  { amount: 200, expected: 'PLN 200.00 = $57.14' },
  { amount: 35,  expected: 'PLN 35.00 = $10.00' },
    ];

    for (const { amount, expected } of plnToUsdCases) {
    it(`should render "${expected}" for PLN ${amount} -> USD`, () => {
        render(<ResultBox from="PLN" to="USD" amount={amount} />);
        const resultDiv = screen.getByTestId('result-box');
        expect(resultDiv).toHaveTextContent(expected);
    });
    };

    it( 'should render proper info about conversion when USD -> PLN',() => {
    render(<ResultBox from ="USD" to="PLN" amount={100}/>);

    const resultDiv = screen.getByTestId('result-box');
    expect(resultDiv).toHaveTextContent('$100.00 = PLN 350.00')
  });

  const usdToPlnCases = [
  { amount: 100, expected: '$100.00 = PLN 350.00' },
  { amount: 10,  expected: '$10.00 = PLN 35.00' },
  { amount: 28.57, expected: '$28.57 = PLN 100.00' }, 
];

for (const { amount, expected } of usdToPlnCases) {
  it(`should render "${expected}" for USD ${amount} -> PLN`, () => {
    render(<ResultBox from="USD" to="PLN" amount={amount} />);
    const resultDiv = screen.getByTestId('result-box');
    expect(resultDiv).toHaveTextContent(expected);
  });
}

it('should render equal values when from and to are the same', () => {
  render(<ResultBox from="PLN" to="PLN" amount={123} />);
  const resultDiv = screen.getByTestId('result-box');
  expect(resultDiv).toHaveTextContent('PLN 123.00 = PLN 123.00');
});

it('should render equal values for USD to USD', () => {
  render(<ResultBox from="USD" to="USD" amount={50} />);
  const resultDiv = screen.getByTestId('result-box');
  expect(resultDiv).toHaveTextContent('$50.00 = $50.00');
});

//Negatywne przypadki
it('should display "Wrong value..." when  amount is negative', () => {
    render (<ResultBox from="PLN" to="USD" amount={-10} />);
    const resultDiv = screen.getByTestId('result-box');
    expect(resultDiv).toHaveTextContent('Wrong value...');
})

 it('should display "Wrong value..." when from = to and amount is negative', () => {
    render(<ResultBox from="USD" to="USD" amount={-5} />);
    const resultDiv = screen.getByTestId('result-box');
    expect(resultDiv).toHaveTextContent('Wrong value...');
  });

   })