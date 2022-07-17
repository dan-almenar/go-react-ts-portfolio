import React from 'react'

function Loading() {
  return (
    <div className='container is-half m-5'>
    <p className="has-text-centered is-size-3 twinkle">
      Loading...
    </p>
    <progress className="progress is-small" />
  </div>    
  )
}

export default Loading