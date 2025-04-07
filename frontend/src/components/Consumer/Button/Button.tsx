import type { FC, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import type { TapHandlers } from 'framer-motion';

import { cn } from '@/utils';

interface ButtonProps extends PropsWithChildren {
  onTap?: TapHandlers['onTap'];
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, onTap, disabled = false }) => {
  return (
    <motion.button
      className={cn(
        "group relative cursor-pointer p-1",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      whileHover={!disabled ? { scale: 1.1 } : undefined}
      whileTap={!disabled ? { scale: 1 } : undefined}
      onTap={!disabled ? onTap : undefined}
      disabled={disabled}
    >
      <motion.div
        className={cn(
          'absolute inset-0 z-[1] rounded-2xl opacity-60 blur-xl transition duration-300 group-hover:opacity-100',
          'bg-[radial-gradient(circle_farthest-side_at_0_100%,#61dafb,transparent),radial-gradient(circle_farthest-side_at_100%_0,#3c82f6,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]',
        )}
      />
      <motion.div
        className={cn(
          'absolute inset-[2px] z-[1] rounded-[12px]',
          'bg-[radial-gradient(circle_farthest-side_at_0_100%,#61dafb,transparent),radial-gradient(circle_farthest-side_at_100%_0,#3c82f6,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]',
        )}
      />

      <div className="relative z-10 rounded-[10px] bg-[#282c34] px-4 py-2 text-white">{children}</div>
    </motion.button>
  );
};

export default Button;
