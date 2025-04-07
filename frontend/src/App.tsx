

import Typewriter from './components/TypeWritter/TypeWritter';
import Consumer from './components/Consumer/Consumer';
import Table from './components/Table/Table';
import TableHeader from './components/Table/TableHeader/TableHeader';
import OrderBookRows from './components/Table/OrderBookRows/OrderBookRows';
import { useOrderBookStore } from './store/orderBookStore';

function App() {
  const { orderBookData } = useOrderBookStore();

  const words = [
    { text: 'Order ', className: 'text-[#f0b90b]' },
    { text: 'Book ', className: 'text-[#0c0e12]' },
    { text: 'de ', className: 'text-[#f0b90b]' },
    { text: 'BTC ', className: 'text-[#0c0e12]' },
    { text: 'Binance', className: 'text-[#f0b90b]' },

  ];

  return (
    <div className="flex min-h-screen flex-col items-center  gap-2 bg-[#282c34] pb-8 text-white">
          <Typewriter words={words} />
          <Consumer roomName={1} />
          <div className='flex flex-row gap-3 w-md mt-10'>
          <Table>
            <TableHeader />
            <OrderBookRows rows={{ bids: orderBookData.bids, asks: [] }} />
          </Table>
          <Table>
            <TableHeader />
            <OrderBookRows rows={{ bids: [], asks: orderBookData.asks }} />
          </Table>
          </div>
    </div>
  );
}

export default App;
