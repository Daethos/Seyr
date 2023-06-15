import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Loading from '../../components/Loading/Loading';
import ToastAlert from '../../components/ToastAlert/ToastAlert';
import { GAME_ACTIONS } from './GameStore';
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

const QuestButtons = ({ options, setQuestData }: { options: any, setQuestData: any }) => {
    const buttons = Object.keys(options).map((o: any, i: number) => {
        return (
            <div key={i}>
            <Button variant='' onClick={() => setQuestData(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }} className='dialog-buttons'>{o.title}</Button>
            </div>
        );
    });
    return <>
            <span style={{ color: 'gold' }}>Quests</span><br />
            {buttons}
        </>;
};
  
const ProvincialWhispersButtons = ({ options, handleRegion }: { options: any, handleRegion: any }) => {
    console.log(options, 'The Options');
    const buttons = Object.keys(options).map((o: any, i: number) => {
        console.log(o, 'Options in ProvincialWhispersButtons');
        return (
            <Button variant='' key={i} onClick={() => handleRegion(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }} className='dialog-buttons'>{o}</Button>
        )
    });
    return <>{buttons}</>;
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

const regionInformation = {
    Astralands: "Good one, those Ashtre have quite the mouth on them I hear yet never heard. Perhaps you'll be able to catch their whispers.", 
    Kingdom: "The King, Mathyus Caderyn II, has been away from his court as of late, his son Dorien sitting the throne--though constant feathers aid his communication when abroad. Despite its unification, groans have increased with disparate and slow recovery from the century long war only having quelled for 7 years prior, with select places receiving abundance of aid over others, the discernment itself seeming weighed in favor of longstanding allies. As the King reaches further East to establish peaceable connections with the Soverains, it leads one to speculate on the disposition of those houses already under his kingship.", 
    Soverains: "The Soverain-Eulex, Garrick Myelle, is throwing a week's long feast for the coming manhood of his son, Relien Myelle. It is his last surviving son, others perishing in the Kingdom-Soverain War, and his daughter being wed off to the Kingdom as part of a truce. It has been wondered whether the boy can live up to the immense fortune and luck of his father, whom started not long ago as a would-be trader lord, slowly building roads and connectivitiy throughout the Soverains during the war, a wild boon during the war economically--its enhancement of intra-provincial aid notwithstanding.", 
    Fangs: "Word has spread that the growing settlement and peaceable futures of provinces has caused the chaotic stability of mercenary life in the Fangs to decouple from the consistent pattern of war occurring throughout the land for centuries. Some have been accepting work which brings them far and away from their homelands, by whom and for what purpose remains to be recorded. The Fang Lords themselves have outstretched their lands to incorporate better agriculture, with some of the more inland mercenaries providing a challenge as they wish to graze the land as any animal would. What do you believe?", 
    Licivitas: "The Ascean, General Peroumes, is avoiding the prospect of coming back to Lor without cause of the authority of both the First Lorian and the Dae it seems. Much criticism of his prolonged campaign among the optimate fall to whipsers on the shoulders of the adoring populare, tales of his commentaries reaching further than the Good Lorian's word, its been said. The Cragorean, enemies in the current war against Licivitas, despite their fewer numbers and armament, have proved ruthless in their willingness to defy Licivitan conquest. What do you make of that growing sentiment?", 
    Firelands: "The Ghosthawk of Greyrock, Theogeni Spiras, has not been seen as of late--his wife's health has been failing worse. He has been leaning on his administration housed with devoted, a strong change from the previous Protectorate, the Ashfyres and their adherence to Fyer, tradition that has persisted since written word. Peculiar, the man, once wildly famed from his crowning at the Ascea in 130, to overthrowing the longstanding Fyerslord, Laveous Ashfyre. The last vestige of their lineage, Searous Ashfyre, has been left in a fragile position, and many are curious as to the future of the Firelands. What do you think?", 
    Sedyrus: "The Sedyren Sun, Cyrian Shyne, has reached an agreement with a lesser Quor'ator to betrothe his firstborn son to one of their daughters, hoping to stem general unrest from the cooling tempers of various families being uprooted of the Quor'eite, who lost a surprise war against their neighboring Sedyreal some decades past--the province solidifying after centuries of a Sedyrus/Quor'eia split into Sedyrus. Would you believe those that say this will leads toward a more peaceful future?", 
    Isles: "The Alluring Isles is its own world, gigantic and terrifying despite its grandeur isolated by strange tides. The land itself a shade of this world, yet what can allow a man to travel a fortnight here, and a day there? I've heard about the size of the animals that stalk those jungles and swim in the waters, hard to believe anyone can sustain themselves there. Would you wish to see this place?",
};

interface Region { 
    Astralands: string;
    Kingdom: string;
    Soverains: string;
    Fangs: string;
    Licivitas: string;
    Firelands: string;
    Sedyrus: string;
    Isles: string; 
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
    const [province, setProvince] = useState<keyof typeof regionInformation>('Astralands');
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

    const handleRegion = (region: keyof Region) => {
        console.log(region, 'What are you ?')
        setProvince(region);
    };

    const handleJournal = (journal: any) => {
        setEntry(ascean?.journal?.entries[journal]);
    };

    const handleQuest = (quest: any) => {
        setQuestData(quest);
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
                {/* <QuestButtons options={quests} setQuestData={handleQuest} /> */}
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