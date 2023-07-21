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
)};
 
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
    mapState: any;
    mapDispatch: any;
    gameDispatch: any;
    quests: any;
};

const Journal = ({ dispatch, gameDispatch, mapState, mapDispatch, ascean, quests }: JournalProps) => {
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
            <div className='dialog-box'>
            <div className='dialog-text'>
            <ToastAlert error={error} setError={setError} />
            <img src={process.env.PUBLIC_URL + `/images/` + ascean?.origin + '-' + ascean?.sex + '.jpg'} alt={ascean?.name} className='dialog-picture' style={{ borderRadius: "50%", border: "2px solid purple" }} />
            {' '}{ascean.name} (Level {ascean.level})<br />
            { journalEntries?.length > 0 ? (
                <JournalEntry entry={entry} />
            ) : ( '' ) }
            </div>
            <div className='dialog-options'>
                <JournalButtons options={journalEntries} setJournalEntry={handleJournal} />
                {/* <QuestButtons options={quests} setQuestData={handleQuest} /> */}
            </div>
            </div>
        ) : ('') }
        <Button variant='' className='journal-button' onClick={() => setShowJournal(!showJournal)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" height="18" width="18">
            <path d="M2.273 32v-0.501c0-9.479-0.007-18.953 0.022-28.43 0-1.123-0.31-2.036-1.135-2.783-0.084-0.077-0.155-0.167-0.265-0.287h30.211c-0.15 0.156-0.266 0.286-0.392 0.407-0.706 0.676-1.015 1.488-1.014 2.478q0.027 14.323 0.014 28.64v0.473l-13.719-6.858zM3.914 1.601v27.734l12.077-6.174 12.077 6.174v-27.734z"></path>
            <path d="M22.195 15.529h-12.407c-0.135-0.473-0.275-0.95-0.407-1.43-0.272-0.979-0.546-1.953-0.795-2.941-0.026-0.11-0.041-0.236-0.041-0.365 0-0.123 0.013-0.242 0.039-0.357l-0.002 0.011c0.102-0.502 0.251-0.995 0.407-1.592l1.117 1.839c-0.091 0.15-0.179 0.286-0.26 0.427-0.262 0.456-0.1 0.953 0.392 1.147 0.821 0.324 1.675 0.271 2.528 0.177 0.349-0.043 0.661-0.111 0.963-0.204l-0.039 0.010c0.896-0.261 1.314-1.011 1.032-1.906-0.129-0.406-0.351-0.782-0.553-1.221l1.826-3.292 1.796 3.245c-0.215 0.569-0.472 1.041-0.562 1.545-0.15 0.814 0.251 1.392 1.041 1.622 0.563 0.171 1.21 0.269 1.88 0.269 0.415 0 0.82-0.038 1.214-0.11l-0.041 0.006c0.843-0.147 1.258-0.805 0.668-1.534-0.035-0.050-0.069-0.109-0.1-0.169l-0.004-0.009c0.351-0.58 0.702-1.167 1.053-1.755h0.091c0.095 0.836 0.632 1.576 0.319 2.512-0.411 1.239-0.711 2.514-1.059 3.774-0.029 0.1-0.063 0.199-0.096 0.302z"></path>
            <path d="M22.198 16.165v0.897h-12.394v-0.897z"></path>
            <path d="M5.917 17.062v-0.899h2.013v0.899z"></path>
            <path d="M26.061 17.074h-2.003v-0.907h2.003z"></path>
            </svg>
        </Button>
        </>
    );
};

export default Journal;