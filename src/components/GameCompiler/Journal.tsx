import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Loading from '../../components/Loading/Loading';
import ToastAlert from '../../components/ToastAlert/ToastAlert';
import { GAME_ACTIONS } from './GameStore';


const JournalButtons = ({ options, setJournalEntry }: { options: any, setJournalEntry: any }) => {
    const buttons = Object.keys(options).map((o: any, i: number) => {
        return (
            <div key={i}>
            <Button variant='' onClick={() => setJournalEntry(o)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }} className='dialog-buttons'>{o.title}</Button>
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

const JournalEntry = ({ entry, setJournalEntry }: { entry: any, setJournalEntry: any }) => {
    const { title, body, footnote, date, location, coordinates } = entry;
    return (
        <div>
        <h3>{entry?.title}
        <p>{entry?.date}</p>
        </h3>
        <h6>{entry?.body}</h6>
        <p>[{entry?.footnote}]</p>
        <p>({entry?.location}) X: {entry?.coordinates?.x} Y: {entry?.coordinates?.y}</p>
        {/* <Button variant='' onClick={() => setJournalEntry(null)} style={{ color: 'green', fontVariant: 'small-caps', fontWeight: 550 }} className='dialog-buttons'>Back</Button> */}
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
    mapState: any;
    mapDispatch: any;
    gameDispatch: any;
    quests: any;
};

const Journal = ({ dispatch, gameDispatch, mapState, mapDispatch, ascean, quests }: JournalProps) => {
    const [questData, setQuestData] = useState<any>(quests[0]);
    const [journalEntries, setJournalEntries] = useState(ascean.journal);
    const [entry, setEntry] = useState(ascean.journal.currentEntry);
    const [province, setProvince] = useState<keyof typeof regionInformation>('Astralands');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>({ title: '', content: '' });
    const [showJournal, setShowJournal] = useState<boolean>(false);

    useEffect(() => {
        setJournalEntries(ascean?.journal);
        setEntry(ascean?.journal?.currentEntry);
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
        setEntry(journal);
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
            <div className='dialog-box'>
            <div className='dialog-text'>
            <ToastAlert error={error} setError={setError} />
            <img src={process.env.PUBLIC_URL + `/images/` + ascean?.origin + '-' + ascean?.sex + '.jpg'} alt={ascean?.name} style={{ width: "15vw", borderRadius: "50%", border: "2px solid purple" }} />
            {' '}{ascean.name} (Level {ascean.level})<br />
            { journalEntries?.length > 0 ? (
                <JournalEntry entry={entry} setJournalEntry={setJournalEntries} />
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