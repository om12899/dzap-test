import React from 'react'

function Alert() {
    const CombineBalances=()=>{
        console.log("combine balances clicked");
    }
    const keepFirst=()=>{
        console.log("Keep First clicked");
    }

    
  return (
    <div className='mb-3 row justify-content-between container'>
      <div className='d-flex text-danger  '>
         <div className='text-danger d-flex'><strong>Duplicated</strong></div>
    <div className='d-flex  col-md-3 ms-auto'> 
     <div className='px-2' onClick={CombineBalances}>Keep the first one</div>
     |
    <div className='px-2' onClick={keepFirst}>Combine Balances</div>
    </div>
        
      </div>
      <div className='d-flex border border-danger rounded-2'>
        <div className='p-4'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
</svg>
        </div>
        <div className='text-danger p-1'>
        <ul>
              {duplicateAddressLines.map((lineNumber) => (
                <li key={lineNumber}>Line {lineNumber + 1}</li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Alert
