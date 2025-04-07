import type { ReactNode } from 'react';

type TableProps = {
  children: ReactNode;
};

const Table = ({ children }: TableProps) => {
  return (
    <table className='w-[600px] px-2'>
      <colgroup>
        <col span={1} className="w-1/2" />
        <col span={1} className="w-1/2" />
      </colgroup>
      {children}
    </table>
  );
};

export default Table;
