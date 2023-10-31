import { Fragment, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children?: ReactNode
  title?: string
  to?: string
  className?: string
  onClick?: () => void
}

const Button = ({ title, children, to, className = '', onClick }: Props) => {
  return (
    <Fragment>
      {to ? (
        <Link
          to={`${to}`}
          className={`font-medium ${className}`}
          onClick={onClick}
        >
          {title}
          {children}
        </Link>
      ) : (
        <button className={`font-medium ${className}`} onClick={onClick}>
          {title}
          {children}
        </button>
      )}
    </Fragment>
  )
}

export default Button
