export const convertPLNToUSD = (PLN) => {
    // 1. Obsługa stringów
  if (typeof PLN === 'string') {
    return NaN;
  }

  // 2. Obsługa braku argumentu
  if (PLN === undefined) {
    return NaN;
  }

  // 3. Jeśli to nie jest liczba → zwróć "Error"
  if (typeof PLN !== 'number') {
    return 'Error';
  }

  // 4. Obsługa liczb ujemnych
  if (PLN < 0) {
    return '$0.00';
  }

  // 5. Wszystko OK – wykonaj konwersję
  const PLNtoUSD = PLN / 3.5;

  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}