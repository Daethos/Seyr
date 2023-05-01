import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import './Messages.css'
import MessagesCard from './MessagesCard';

interface Props {
    user: any;
    friend: any
    usersMessages: any;
    frenDMs: any;
};

const Direct = ({ user, friend, usersMessages, frenDMs }: Props) => {
    const DMs = [...frenDMs, ...usersMessages];
    const [DMstate, setDMstate] = useState<any>([
        ...frenDMs,
        ...usersMessages
    ]);
    
    const [loading, setLoading] = useState<boolean>(false);
    console.log(DMstate, '<- Fren and User Messages');
    
    useEffect(() => {
      sortDMs()
    }, []);
    

    const sortingFunction = async () => DMstate?.sort((a: any, b: any) => {
       if  (a.createdAt > b.createdAt) {
            return 1
       };
       if (a.createdAt < b.createdAt) {
            return -1
       };
       return 0;
    });

    async function sortDMs() {
        setLoading(true)
        try {
            const response = await sortingFunction();
            console.log(response, '<- Response sorting DMs');
            setDMstate(response);
        } catch (err: any) {
            console.log(err.message, '<- Error sorting DMs');
        };
    };

    if (loading) {
        <Loading />
    };
    return (
        <>
        {DMstate.map((message: any, index: number) => {
            return (
                <MessagesCard message={message} user={user} friend={friend} key={index} />
            )
        })}
        </>
    );
};

export default Direct;