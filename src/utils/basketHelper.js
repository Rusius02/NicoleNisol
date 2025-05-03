export function groupBasketItems(items) {
    return items.reduce((acc, item) => {
      const existing = acc.find(book => book.priceIDFromStripe === item.priceIDFromStripe);
  
      if (existing) {
        existing.quantity += 1;
        existing.totalPrice += item.price;
      } else {
        acc.push({
          title: item.title,
          description: item.description,
          coverImagePath: item.coverImagePath,
          priceIDFromStripe: item.priceIDFromStripe,
          quantity: 1,
          unitPrice: item.price,
          totalPrice: item.price
        });
      }
  
      return acc;
    }, []);
  }
  
  export function calculateTotalAmount(items) {
    return groupBasketItems(items)
      .reduce((total, item) => total + item.unitPrice * item.quantity, 0) * 100;
  }