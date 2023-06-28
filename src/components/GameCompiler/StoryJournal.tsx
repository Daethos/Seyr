import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Loading from '../../components/Loading/Loading';
import ToastAlert from '../../components/ToastAlert/ToastAlert';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const JournalButtons = ({ options, setJournalEntry }: { options: any, setJournalEntry: any }) => {
    const buttons = options.map((o: any, i: number) => {
        return (
            <div key={i}>
            <Button variant='' onClick={() => setJournalEntry(i)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }} className='dialog-buttons'>{o.title}</Button>
            </div>
        );
    });
    return (
        <div style={{ marginTop: "5%" }}>
            <span style={{ color: 'gold' }}>Entries</span><br />
            {buttons}
        </div>
    );
}; 

const JournalEntry = ({ entry }: { entry: any }) => {
    return (
        <div style={{ whiteSpace: "pre-wrap" }}>
            <h3 style={{ color: "purple" }} className='mt-3 mb-4'>Entry: {entry?.title}</h3>
            <h6 style={{ color: "gold" }}>{entry?.body}</h6>
            <p className='mt-5'>Footnote: {entry?.footnote}</p>
            <p style={{ color: "#fdf6d8" }}>Time: {formatDistanceToNow(new Date(entry?.date))} ago.</p>
            <p style={{ color: "gold" }}>Location: ({entry?.location}) X: {entry?.coordinates?.x} Y: {entry?.coordinates?.y}</p>
        </div>
    );
}; 

interface JournalProps {
    ascean: any;
    dispatch: any;
    gameDispatch: any;
    quests: any;
};

const StoryJournal = ({ dispatch, gameDispatch, ascean, quests }: JournalProps) => {
    const [questData, setQuestData] = useState<any>(quests[0]);
    const [journalEntries, setJournalEntries] = useState(ascean.journal.entries);
    const [entry, setEntry] = useState(ascean.journal.currentEntry);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>({ title: '', content: '' });
    const [showJournal, setShowJournal] = useState<boolean>(false);

    useEffect(() => {
        setJournalEntries(ascean?.journal?.entries);
        setEntry(ascean?.journal?.entries[ascean?.journal?.currentEntry]);
    }, [ascean]);

    useEffect(() => {
        if (quests.length > 0) {
            setQuestData(quests[0]);
        };
    }, [quests]);

    const handleJournal = (journal: any) => {
        setEntry(ascean?.journal?.entries[journal]);
    };

    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };

    return (
        <>
        { showJournal ? (
            <div className='dialog-box' style={{ top: "-300px", width: "80vw", border: "4px solid #2A0134" }}>
            <div className='dialog-text'>
            <ToastAlert error={error} setError={setError} />
            <img src={process.env.PUBLIC_URL + `/images/` + ascean?.origin + '-' + ascean?.sex + '.jpg'} alt={ascean?.name} className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
            {' '}{ascean.name} (Level {ascean.level})<br />
            { journalEntries?.length > 0 ? (
                <JournalEntry entry={entry} />
            ) : ( '' ) }
            </div>
            <div className='dialog-options' style={{ border: "1px solid #2A0134" }}>
                <JournalButtons options={journalEntries} setJournalEntry={handleJournal} />
            </div>
            </div>
        ) : ('') }
        <Button variant='' style={{ color: '#fdf6d8', fontWeight: 400, fontVariant: 'small-caps' }} className='ascean-ui' onClick={() => setShowJournal(!showJournal)}>
        <h3 style={{ fontSize: '12px', textAlign: 'center' }} className=''>Journal</h3>
        </Button>
        </>
    );
};

export default StoryJournal;