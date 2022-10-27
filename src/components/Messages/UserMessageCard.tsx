
interface Props {
    user: any;
    message: any;
}

const UserMessageCard = ({ user, message }: Props) => {
  return (
    <>
    {
        message.username === user.username
        ? 
        // <>
                    
            <span className="user-message" style={{color: 'blue'}}>
                {/* <div> */}
                [{message.createdAt.substring(11, 16)}] 
                {message.message}
                {'\n'}
                {/* </div> */}
            </span>
        // </>
        : ''
    }
    </>
  )
}

export default UserMessageCard