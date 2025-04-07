import { create } from 'zustand';

interface OrderBookData {
  bids: [string, string][];
  asks: [string, string][];
}

interface OrderBookState {
  orderBookData: OrderBookData;
  updateOrderBook: (data: OrderBookData) => void;
}

export const useOrderBookStore = create<OrderBookState>((set) => ({
  orderBookData: {
    bids: [],
    asks: []
  },
  updateOrderBook: (data) => set({ orderBookData: data })
})); 