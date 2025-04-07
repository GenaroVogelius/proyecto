import OrderBookRow from './OrderBookRow/OrderBookRow';

interface OrderBookData {
  bids: [string, string][];
  asks: [string, string][];
}

const OrderBookRows = ({ rows }: { rows: OrderBookData }) => {
  // Función para calcular la suma total de cantidades
  const calculateTotalQuantity = (data: [string, string][]) => {
    return data.reduce((sum, [_, quantity]) => sum + parseFloat(quantity || '0'), 0);
  };

  // Convertimos los datos del orderbook al formato esperado por OrderBookRow
  const formatRows = (data: [string, string][], isBid: boolean) => {
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return [];
    }

    const totalQuantity = calculateTotalQuantity(data);

    return data.map(([price, quantity]) => {
      const formattedRow = {
        price: price || '0',
        quantity: quantity || '0',
        color: isBid ? 'green' : 'red',
        barWidth: Math.min(100, (parseFloat(quantity || '0') / totalQuantity) * 100)
      };
      return formattedRow;
    });
  };

  const bidRows = formatRows(rows?.bids || [], true);
  const askRows = formatRows(rows?.asks || [], false);

  return (
    <tbody>
      {bidRows.length > 0 && bidRows.map((row, idx) => (
        <OrderBookRow key={`bid-${idx}`} {...row} />
      ))}
      {askRows.length > 0 && askRows.map((row, idx) => (
        <OrderBookRow key={`ask-${idx}`} {...row} />
      ))}
    </tbody>
  );
};

export default OrderBookRows;

