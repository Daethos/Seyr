import React from 'react'
import './Messages.css'

interface Props {
    userMessages: any;
}

const Friends = ({ userMessages }: Props) => {
  return (
    <>
        [{userMessages.createdAt.substring(2, 10) + ' ' + userMessages.createdAt.substring(11, 16)}]: {userMessages.message}<br />
    </>
  )
}

export default Friends