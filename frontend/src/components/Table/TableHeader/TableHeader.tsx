const TableHeader = () => {
  return (
    <thead className='w-full text-broken-white text-sm'>
      <tr>
        <th scope='col' className='px-3'>
          <div className="flex items-center justify-center h-full">
            Precio USD
          </div>
        </th>
        <th scope='col' className='px-3'>
          <div className="flex items-center justify-center h-full">
            Cantidad
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
  