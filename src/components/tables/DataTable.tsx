import {useTable} from 'react-table';

const DataTable = ({tableRow = [], tableCol = [], notFoundMessage="No Data Found"}) => {
  const data = tableRow;

  const columns = tableCol;

  const tableInstance = useTable({columns, data});

   const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = tableInstance

  return (
   // apply the table props
   <div className="overflow-x-auto max-w-full">
   <table {...getTableProps()} className="table-auto w-full">
     <thead>
       {// Loop over the header rows
       headerGroups.map(headerGroup => (
         // Apply the header row props
         <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
           {// Loop over the headers in each row
           headerGroup.headers.map(column => (
             // Apply the header cell props
             <th {...column.getHeaderProps()} className="py-3 px-6 text-left">
               {// Render the header
               column.render('Header')}
             </th>
           ))}
         </tr>
       ))}
     </thead>
     {/* Apply the table body props */}
     <tbody {...getTableBodyProps()} className="text-gray-600 text-sm font-light">
       {// Loop over the table rows
       rows.length > 0 ?
       rows.map(row => {
         // Prepare the row for display
         prepareRow(row)
         return (
           // Apply the row props
           <tr {...row.getRowProps()} className="border-b border-gray-200 hover:bg-gray-100">
             {// Loop over the rows cells
             row.cells.map(cell => {
               // Apply the cell props
               return (
                 <td {...cell.getCellProps()} className="py-3 px-6 text-left min-w-max">
                   {// Render the cell contents
                   cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
         )
       }) : <tr className="border-b border-gray-200 hover:bg-gray-100">
         <td colSpan={headerGroups[0].headers.length} className="py-3 px-6 text-center min-w-max">{notFoundMessage}</td>
       </tr>
      }
     </tbody>
   </table>
   </div>)
}

export default DataTable
