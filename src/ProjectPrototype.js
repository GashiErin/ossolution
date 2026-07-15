import { useMemo, useState } from 'react';

const demoLabels = {
  'Signal Atlas': 'Trace an intelligence signal',
  'Morrow Objects': 'Configure a modular object',
  'Tidal Commons': 'Compare a coastal scenario',
  'Relay Field': 'Test an offline delivery queue',
  'After Hours Archive': 'Explore an event fragment',
  'Form Zero': 'Deform an adaptive material',
  'Civic Pulse': 'Report and route a city issue',
  'Kinetic Ledger': 'Review a financial movement',
};

function SignalDemo() {
  const [signal, setSignal] = useState(1);
  const sources = ['Research note', 'Verified dataset', 'Team decision'];
  return <div className="signal-demo demo-stage"><div className="signal-map">{[0,1,2,3,4].map(node => <button key={node} className={signal === node ? 'active' : ''} onClick={() => setSignal(node)} style={{ '--x':`${12 + node * 19}%`, '--y':`${node % 2 ? 28 : 68}%` }} aria-label={`Open signal ${node + 1}`} />)}<i /></div><div className="demo-readout"><span>SIGNAL / 0{signal + 1}</span><strong>{sources[signal % 3]}</strong><p>Confidence {91 - signal * 4}% · {3 + signal} linked sources</p></div></div>;
}

function MorrowDemo() {
  const [shape, setShape] = useState(0);
  const [material, setMaterial] = useState('RESIN');
  return <div className="morrow-demo demo-stage"><div className={`object-stack shape-${shape}`}><i/><i/><i/></div><div className="demo-controls"><span>FORM / {shape + 1}</span><input aria-label="Object configuration" type="range" min="0" max="2" value={shape} onChange={event => setShape(Number(event.target.value))}/><div>{['RESIN','CERAMIC','COMPOSITE'].map(item => <button className={material === item ? 'active' : ''} onClick={() => setMaterial(item)} key={item}>{item}</button>)}</div><strong>{material} / DESIGNED FOR DISASSEMBLY</strong></div></div>;
}

function TidalDemo() {
  const [year, setYear] = useState(2040);
  const level = ((year - 2030) / 40) * 48;
  return <div className="tidal-demo demo-stage"><div className="coast-model"><div className="water" style={{ height:`${22 + level}%` }}/><i/><i/><i/></div><div className="demo-controls"><span>COASTAL SCENARIO / {year}</span><input aria-label="Climate scenario year" type="range" min="2030" max="2070" step="10" value={year} onChange={event => setYear(Number(event.target.value))}/><strong>PROJECTED WATERLINE +{((year - 2030) * .021).toFixed(2)}M</strong><p>Illustrative scenario—not scientific forecast data.</p></div></div>;
}

function RelayDemo() {
  const [online, setOnline] = useState(false);
  const [queue, setQueue] = useState(['Proof photo','Recipient signature']);
  const add = () => setQueue(items => [...items, `Field update ${items.length + 1}`]);
  const sync = () => online && setQueue([]);
  return <div className="relay-demo demo-stage"><div className="queue-panel"><header><span>{online ? '● ONLINE' : '○ OFFLINE'}</span><button onClick={() => setOnline(!online)}>{online ? 'GO OFFLINE' : 'RESTORE SIGNAL'}</button></header>{queue.length ? queue.map((item,index) => <div key={`${item}-${index}`}><i>{String(index+1).padStart(2,'0')}</i><strong>{item}</strong><span>{online ? 'READY' : 'QUEUED'}</span></div>) : <p>Everything is synchronized.</p>}</div><div className="demo-controls"><button onClick={add}>+ CAPTURE UPDATE</button><button className="accent" disabled={!online || !queue.length} onClick={sync}>SYNC {queue.length} ITEMS</button></div></div>;
}

function ArchiveDemo() {
  const [active, setActive] = useState(0);
  const events = [['NOCTURNE 14','Experimental sound · 42 min'],['ROOM TONE','Live performance · 58 min'],['BLUE HOUR','Field recording · 31 min']];
  return <div className="archive-demo demo-stage"><div className="archive-orbit">{events.map((event,index) => <button className={active === index ? 'active' : ''} key={event[0]} onClick={() => setActive(index)}>{String(index+1).padStart(2,'0')}</button>)}<i className={active === 1 ? 'playing fast' : 'playing'}/></div><div className="demo-readout"><span>ARCHIVE FRAGMENT / 0{active+1}</span><strong>{events[active][0]}</strong><p>{events[active][1]}</p><div className="wave">{Array.from({length:18},(_,index)=><i key={index} style={{height:`${15 + ((index * 17 + active * 13) % 70)}%`}}/>)}</div></div></div>;
}

function FormDemo() {
  const [pressure, setPressure] = useState(42);
  return <div className="form-demo demo-stage"><div className="material-sheet" style={{ '--cut':`${pressure * .25}%`, '--cut2':`${pressure * .3}%`, '--cut3':`${pressure * .2}%` }}><i/></div><div className="demo-controls"><span>APPLIED PRESSURE / {pressure}%</span><input aria-label="Material pressure" type="range" min="0" max="100" value={pressure} onChange={event => setPressure(Number(event.target.value))}/><strong>{pressure < 35 ? 'FOLDING' : pressure < 70 ? 'FLOWING' : 'LOCKING'}</strong></div></div>;
}

function CivicDemo() {
  const [issues, setIssues] = useState([{type:'LIGHT',status:'ROUTED'},{type:'ROAD',status:'REVIEW'}]);
  const addIssue = () => setIssues(items => [...items,{type:['WASTE','WATER','ACCESS'][items.length % 3],status:'NEW'}]);
  const advance = index => setIssues(items => items.map((item,i) => i === index ? {...item,status:item.status === 'NEW' ? 'ROUTED' : item.status === 'ROUTED' ? 'REVIEW' : 'RESOLVED'} : item));
  return <div className="civic-demo demo-stage"><div className="civic-map"><i/><i/><i/><i/>{issues.map((issue,index)=><button key={index} className={`pin pin-${index%4}`} onClick={() => advance(index)}>{index+1}</button>)}</div><div className="issue-list"><header><span>NEIGHBORHOOD / LIVE PROTOTYPE</span><button onClick={addIssue}>+ REPORT ISSUE</button></header>{issues.slice(-4).map((issue,index)=><div key={index}><strong>{issue.type}</strong><span>{issue.status}</span></div>)}</div></div>;
}

function LedgerDemo() {
  const initial = useMemo(() => [{name:'Vendor batch',amount:'€18,420',status:'REVIEW'},{name:'Infrastructure',amount:'€4,880',status:'REVIEW'},{name:'Payroll reserve',amount:'€32,100',status:'LOCKED'}],[]);
  const [items,setItems] = useState(initial);
  const approve = index => setItems(current => current.map((item,i) => i === index && item.status === 'REVIEW' ? {...item,status:'APPROVED'} : item));
  return <div className="ledger-demo demo-stage"><div className="ledger-path">{items.map((item,index)=><button key={item.name} className={item.status.toLowerCase()} onClick={() => approve(index)}><i>{index+1}</i><span>{item.name}</span><strong>{item.amount}</strong><em>{item.status}</em></button>)}</div><div className="demo-readout"><span>APPROVAL FLOW</span><strong>{items.filter(item => item.status === 'APPROVED').length} / {items.length} CLEARED</strong><p>Select a review item to approve it.</p></div></div>;
}

export default function ProjectPrototype({ projectName }) {
  const demos = { 'Signal Atlas':SignalDemo, 'Morrow Objects':MorrowDemo, 'Tidal Commons':TidalDemo, 'Relay Field':RelayDemo, 'After Hours Archive':ArchiveDemo, 'Form Zero':FormDemo, 'Civic Pulse':CivicDemo, 'Kinetic Ledger':LedgerDemo };
  const Demo = demos[projectName];
  if (!Demo) return null;
  return <section className="prototype-lab"><div className="prototype-head"><span>DESIGNED & BUILT BY ORBIT / WORKING PROTOTYPE</span><h3>{demoLabels[projectName]}</h3><p>We made this interactive front-end prototype to demonstrate the project’s core product idea. It is an original studio build, not a client commission or production system.</p></div><Demo /></section>;
}
