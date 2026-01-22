import React from 'react'
import { parseEmailsFromFile } from '../../utils/csvParser';

export default function CsvUpload({onEmailsParsed}) {
  return (
    <div>
      
      <label className='block text-sm font-medium mb-1'>Upload CSV / Text</label>

      <input type='file' accept='.csv,.txt' onChange={e => {
        const file = e.target.files[0];
        if(file){
          parseEmailsFromFile(file,onEmailsParsed);
        }
      }} className='block w-full text-sm' /> 
    </div>
  )
}
