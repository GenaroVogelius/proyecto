import { motion } from 'framer-motion';

type OrderBookRowProps = {
    price: string;
    quantity: string;
    color: string;
    barWidth: number;
  }
  
  const OrderBookRow = ({ price, quantity, color, barWidth }: OrderBookRowProps) => {
    const textColor = color === 'red' ? 'text-red-500' : 'text-green-500';
    const barColor = color === 'red' ? 'bg-red-500/20' : 'bg-green-500/20';
  
    return (
      <motion.tr 
        key={`${price}-${quantity}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="font-medium text-sm hover:bg-gray-800 py-0.5"
      >
        <td className={`${textColor} px-3`}>
          <motion.div 
            key={price}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center h-full"
          >
            <p className="text-sm">{price}</p>
          </motion.div>
        </td>
        <td className="text-white w-full px-3 relative">
          <div className="absolute inset-0 flex items-center">
            <motion.div
              key={barWidth}
              initial={{ width: 0 }}
              animate={{ width: `${barWidth}%` }}
              transition={{ duration: 0.3 }}
              className={`h-full ${barColor}`}
            />
          </div>
          <motion.div 
            key={quantity}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex items-center justify-center h-full"
          >
            {quantity}
          </motion.div>
        </td>
      </motion.tr>
    );
  };
  
  
export default OrderBookRow;