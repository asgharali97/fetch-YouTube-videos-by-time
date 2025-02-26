import React from 'react'

const Button = ({content,type,className,...props}) => {
  return (
    <>
      <button 
        className={`py-2 px-4 w-24 bg-[#DCD7C9] text-center ${className}`}
        type={type}
        {...props}
        >
        {content}
      </button>
    </>
  )
}

export default Button
