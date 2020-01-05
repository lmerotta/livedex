import React from 'react'

const Badge: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>> = ({ children, className, ...rest }) => (
  <span className={`${className} rounded-full py-1 px-2 text-xs mr-1`} {...rest}>{children}</span>
)

export default Badge