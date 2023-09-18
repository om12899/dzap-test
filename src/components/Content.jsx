import React, { useState } from 'react';

function Content() {
  const [inputText, setInputText] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [duplicateAddressLines, setDuplicateAddressLines] = useState([]);
  const [lineNumbers, setLineNumbers] = useState([]);
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setLineNumbers(text.split('\n').map((_, index) => index + 1));
  };



  const CombineBalances = () => {
    const lines = inputText.split('\n');
    const mergedValuesMap = {};


        
  
    lines.forEach((line) => {
        if (line.trim() === '') {
            return;
          }
      const parts = line.trim().split(/[,:= ]+/);
      const [address, value] = parts;
  
      if (mergedValuesMap[address]) {
        mergedValuesMap[address] += parseInt(value, 10);
      } else {
        mergedValuesMap[address] = parseInt(value, 10);
      }
    });
  
    const mergedInputLines = Object.entries(mergedValuesMap).map(([address, value]) => {
      return `${address} ${value}`;
    });
  
    const mergedInputText = mergedInputLines.join('\n');
  
    // Update the inputText with the merged input
    setInputText(mergedInputText);
  
    // Clear the duplicateAddressLines and errorMessages
    setDuplicateAddressLines([]);
    setErrorMessages([]);
  };


  const keepFirst = () => {
    const lines = inputText.split('\n');
    const filteredLines = [];
    const seenAddresses = new Set();
    

        
  
    lines.forEach((line, index) => {
        if (line.trim() === '') {
            return;
          }
      const parts = line.trim().split(/[,:= ]+/);
      const [address] = parts;
  
      if (!seenAddresses.has(address)) {
        filteredLines.push(line);
        seenAddresses.add(address);
      }
    });
  
    // Update the inputText with the filtered lines
    setInputText(filteredLines.join('\n'));
  
    // Clear the duplicateAddressLines and errorMessages
    setDuplicateAddressLines([]);
    setErrorMessages([]);
  };

  

  // Function to validate Ethereum address (basic check for hexadecimal string)
  const isValidEthereumAddress = (address) => {
    const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return ethereumAddressRegex.test(address);
  };

  const findDuplicateAddressLines = (array) => {
    const addressToLinesMap = new Map();
    const duplicateAddresses = new Map();
  
    array.forEach((item, index) => {
      const parts = item.split(' ');
      const address = parts[0];
  
      if (addressToLinesMap.has(address)) {
        const lines = addressToLinesMap.get(address);
        lines.push(index);
        addressToLinesMap.set(address, lines);
  
        // Store the duplicate address and its lines
        if (!duplicateAddresses.has(address)) {
          duplicateAddresses.set(address, lines);
        }
      } else {
        addressToLinesMap.set(address, [index]);
      }
    });
  
    // Convert the duplicateAddresses Map to an array of objects
    const duplicateAddressLines = Array.from(duplicateAddresses, ([address, lines]) => ({ address, lines }));
  
    console.log('Duplicate addresses found:');
    duplicateAddressLines.forEach(({ address, lines }) => {
      console.log(`Address: ${address} - Lines: ${lines.join(', ')}`);
    });
  
    return duplicateAddressLines;
  };
  

  const checkError = (e) => {
    e.preventDefault();
    const lines = inputText.split('\n');
    const errors = [];

    lines.forEach((line, index) => {
        if (line.trim() === '') {
            return;
          }
      const parts = line.trim().split(/[,:= ]+/); // Split by colons, commas, spaces, or equal signs
      if (parts.length !== 2) {
        errors.push(`Line ${index + 1} wrong amount`);
      } else {
        const [address, value] = parts;
        if (!isValidEthereumAddress(address)) {
          errors.push(`Line ${index + 1} wrong amount`);
        }
       else  if (!/^\d+$/.test(value)) {
          errors.push(`Line ${index + 1} wrong amount`);
        }
      }
    });

    const duplicateLines = findDuplicateAddressLines(lines);
    setDuplicateAddressLines(duplicateLines);
    setErrorMessages(errors);
  };

  return (
    <div className="container py-2">
      <form className=''>
      <label htmlFor="exampleFormControlTextarea1" className="form-label text-secondary">Addresses with Amounts</label>
        <div className='d-flex pe-2 focus-ring focus-ring-light'> 
        
      <div className="line-numbers fw-bold bg-light text-secondary p-2 border-end">
              {lineNumbers.map((lineNumber) => (
                <div key={lineNumber} className="line-number">{lineNumber}</div>
              ))}
            </div>
            <textarea
              className="form-control fw-bold focus-ring focus-ring-light bg-light text-emphasis-dark border-0"
              rows="9"
              value={inputText}
              onChange={handleInputChange}
            ></textarea></div>
     
          

        <div className='mb-3'>
          <p className='text-secondary'>Separated by ',' or ' ' or '='</p>
        </div>

        {errorMessages.length > 0 && (
          <div className='d-flex border border-danger rounded-2'>
            <div className='p-2'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
              </svg>
            </div>
            <div className='text-danger p-2'>
              <ul className='p-1'>
                {errorMessages.map((errorMessage, index) => (
                  <li className='list-group-item' key={index}>{errorMessage}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {duplicateAddressLines.length > 0 && (
          <div className='mb-3 row justify-content-between container'>
          <div className='d-flex text-danger  '>
             <div className='text-danger d-flex'><strong>Duplicated</strong></div>
        <div className='d-flex  col-md-3 ms-auto'> 
         <div className='px-2' onClick={keepFirst}>Keep the first one</div>
         |
        <div className='px-2' onClick={CombineBalances}>Combine Balances</div>
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
      {duplicateAddressLines.map(({ address, lines }, index) => (
        <li key={index}>
          Address {address} encountered duplicate on line: {lines.map(lineNumber => lineNumber + 1).join(', ')}
        </li>
      ))}
    </ul>
            </div>
          </div>
        </div>
        )}

        <div className="d-grid gap-2 py-2">
          <button className='btn btn-primary' onClick={checkError}>Next</button>
        </div>
      </form>
    </div>
  );
}

export default Content;
