import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Quiz from './components/Quiz';
import Timer from './components/Timer';
import Start from './components/Start';

function App() {

  const [username,setUsername] = useState(null)
  const [questionNumber,setQuestionNumber] = useState(1)
  const [stop,setStop] = useState(false)
  const [earned,setEarned] = useState("0")

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      options: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "Grand Central Terminal, Park Avenue, New York is the world's..",
      options: [
        {
          text: "largest railway station",
          correct: true,
        },
        {
          text: "highest railway station",
          correct: false,
        },
        {
          text: "longest railway station",
          correct: false,
        },
        {
          text: "None of the above",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "For which of the following disciplines is Nobel Prize awarded?",
      options: [
        {
          text: "Physics and Chemistry",
          correct: true,
        },
        {
          text: "Physiology or Medicinen",
          correct: false,
        },
        {
          text: "Literature, Peace and Economics",
          correct: false,
        },
        {
          text: "All of the above",
          correct: false,
        },
      ],
    },
    {
      id: 4,
      question: "The Battle of Plassey was fought in",
      options: [
        {
          text: "1757",
          correct: true,
        },
        {
          text: "1782",
          correct: false,
        },
        {
          text: "1748",
          correct: false,
        },
        {
          text: "1764",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      question: "The territory of Porus who offered strong resistance to Alexander was situated between the rivers of",
      options: [
        {
          text: "Sutlej and Beas",
          correct: false,
        },
        {
          text: "Jhelum and Chenab",
          correct: true,
        },
        {
          text: "Ravi and Chenab",
          correct: false,
        },
        {
          text: "Ganga and Yamuna",
          correct: false,
        },
      ],
    },
    {
      id: 6,
      question: "The trident-shaped symbol of Buddhism does not represent",
      options: [
        {
          text: "Nirvana",
          correct: true,
        },
        {
          text: "Sangha",
          correct: false,
        },
        {
          text: "Buddha",
          correct: false,
        },
        {
          text: "Dhamma",
          correct: false,
        },
      ],
    },
    {
      id: 7,
      question: "The latitudinal differences in pressure delineate a number of major pressure zones, which correspond with",
      options: [
        {
          text: "zones of cyclonic depressions",
          correct: false,
        },
        {
          text: "zones of oceans",
          correct: false,
        },
        {
          text: "zones of land",
          correct: false,
        },
        {
          text: "zones of climates",
          correct: true,
        },
      ],
    },
    {
      id: 8,
      question: "The great Victoria Desert is located in",
      options: [
        {
          text: "Canada",
          correct: false,
        },
        {
          text: "West Africa",
          correct: false,
        },
        {
          text: "Australia",
          correct: true,
        },
        {
          text: "North America",
          correct: false,
        },
      ],
    },
    {
      id: 9,
      question: "The great Victoria Desert is located in",
      options: [
        {
          text: "Canada",
          correct: false,
        },
        {
          text: "West Africa",
          correct: false,
        },
        {
          text: "Australia",
          correct: true,
        },
        {
          text: "North America",
          correct: false,
        },
      ],
    },
    {
      id: 10,
      question: "Where is the Railway Staff College located?",
      options: [
        {
          text: "Pune",
          correct: false,
        },
        {
          text: "Vadodara",
          correct: true,
        },
        {
          text: "Allahabad",
          correct: false,
        },
        {
          text: "Delhi",
          correct: false,
        },
      ],
    },
    {
      id: 11,
      question: "Bijapur is known for its",
      options: [
        {
          text: "severe drought condition",
          correct: false,
        },
        {
          text: "Gol Gumbaz",
          correct: true,
        },
        {
          text: "heavy rainfall",
          correct: false,
        },
        {
          text: "statue of Gomateswara",
          correct: false,
        },
      ],
    },
    {
      id: 12,
      question: "What is part of a database that holds only one type of information?",
      options: [
        {
          text: "Report",
          correct: false,
        },
        {
          text: "Field",
          correct: true,
        },
        {
          text: "Record",
          correct: false,
        },
        {
          text: "File",
          correct: false,
        },
      ],
    },
    {
      id: 13,
      question: "'OS' computer abbreviation usually means ?",
      options: [
        {
          text: "Operating System",
          correct: true,
        },
        {
          text: "Order of Significance",
          correct: false,
        },
        {
          text: "Open Software",
          correct: false,
        },
        {
          text: "Optical Sensor",
          correct: false,
        },
      ],
    },
    {
      id: 14,
      question: "In which decade with the first transatlantic radio broadcast occur?",
      options: [
        {
          text: "1850s",
          correct: false,
        },
        {
          text: "1860s",
          correct: false,
        },
        {
          text: "1870s",
          correct: false,
        },
        {
          text: "1900s",
          correct: true,
        },
      ],
    },
    {
      id: 15,
      question: "Which was the 1st non Test playing country to beat India in an international match?",
      options: [
        {
          text: "Canada",
          correct: false,
        },
        {
          text: "Sri Lanka",
          correct: true,
        },
        {
          text: "Zimbabwe",
          correct: false,
        },
        {
          text: "East Africa",
          correct: false,
        },
      ],
    }
  ]

  const moneyPyramid = useMemo(() =>
    [
      {id:1, amount:'500'},
      {id:2, amount:'1000'},
      {id:3, amount:'2000'},
      {id:4, amount:'3000'},
      {id:5, amount:'4000'},
      {id:6, amount:'5000'},
      {id:7, amount:'10000'},
      {id:8, amount:'25000'},
      {id:9, amount:'50000'},
      {id:10, amount:'75000'},
      {id:11, amount:'100000'},
      {id:12, amount:'125000'},
      {id:13, amount:'250000'},
      {id:14, amount:'500000'},
      {id:15, amount:'1000000'}
    ].reverse(),
  [])

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount)
  },[moneyPyramid, questionNumber]);
  
  return (
    <div className="app d-flex" style={{height:'100vh',backgroundColor:'#020230',color:'white'}}>
      {username ? (
        <>
          <div className="main d-flex" style={{width:'75%',flexDirection:'column'}}>
        {stop ? ( <h1 className='endText'> You Earned : {earned} </h1> ) : (
        <>
          <div className="top" style={{height:'50%',position:'relative'}}>
            <div className="timer" style={{width:'70px',height:'70px',borderRadius:'50%',border:'5px solid #ffffff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'30px',fontWeight:'700',position:'absolute',bottom:'30px',left:'100px'}}> <Timer setStop={setStop} questionNumber={questionNumber} /> </div>
          </div>
          <div className="bottom" style={{height:'50%'}}>
             <Quiz
               data={data} 
               setStop={setStop} 
               questionNumber={questionNumber}
               setQuestionNumber={setQuestionNumber}
             />
          </div>
        </>
        )}
      </div>
      <div className="pyramid d-flex justify-content-center align-items-center" style={{width:'25%'}}>
        <ul className='money' style={{listStyle:'none',width:'100%',padding:'20px'}}>
          {moneyPyramid.map((m)=>(
            <li className={questionNumber === m.id ? "moneyItem active" : "moneyItem"}>
            <span className='moneyItemNumber'> {m.id} </span>
            <span className='moneyItemAmount'> &#8377; {m.amount} </span>
          </li>
          ))}
          
        </ul>
      </div>
        </>
      ) : <Start setUsername={setUsername}/>}
      
    </div>
  );
}

export default App;