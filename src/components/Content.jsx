import React from 'react'
import Alert from './Alert'

function Content() {
  return (
    <div className='container py-2'>
     
      <form>
      <div className="mb-3">
  <label for="exampleFormControlTextarea1 lined" className="form-label">Addresses with Amounts</label>
  <textarea className="form-control bg-light text-emphasis-dark" rows="9"></textarea>
  
  
</div>

<div className='mb-3'>
  <p>Seperated by ',' or ' ' or '='</p>
  </div>
  <Alert/>
<div className="d-grid gap-2">
<button className='btn btn-primary'>Next</button>
</div>
      </form>
    </div>
  )
}

export default Content
