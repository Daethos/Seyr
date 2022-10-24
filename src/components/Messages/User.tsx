import React from 'react'
import './Messages.css'

interface Props {
    friendMessages: any;
}

const User = ({ friendMessages }: Props) => {
  return (
    <>
    [{friendMessages.createdAt.substring(2, 10) + ' ' + friendMessages.createdAt.substring(11, 16)}]: {friendMessages.message}<br />
    </>
  )
}

export default User