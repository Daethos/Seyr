export const isSameSenderMargin = (messages: string | any[], m: { sender: { _id: any; }; }, i: number, userId: any) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };
  
  export const isSameSender = (messages: string | any[], m: { sender: { _id: any; }; }, i: number, userId: any) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };
  
  export const isLastMessage = (messages: string | any[], i: number, userId: any) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };
  
  export const isSameUser = (messages: { sender: { _id: any; }; }[], m: { sender: { _id: any; }; }, i: number) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
  
  export const getSender = (loggedUser: { _id: any; }, users: any[]) => {
    // console.log(loggedUser, users[0].username, 'Logged User and the Users')
    return users[0]._id === loggedUser._id 
    ? users[1].username.charAt(0).toUpperCase() + users[1].username.slice(1) 
    : users[0].username.charAt(0).toUpperCase() + users[0].username.slice(1);
  };
  
  export const getSenderFull = (loggedUser: { _id: any; }, users: any[]) => {
    console.log(loggedUser, users, 'Are we hitting the Full Sender?')
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };