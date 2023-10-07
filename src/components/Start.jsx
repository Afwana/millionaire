import { useRef } from "react"

export default function Start({ setUsername }) {
    const inputRef = useRef()

    const handleClick = () => {
        inputRef.current.value && setUsername(inputRef.current.value)
    }
  return (
    <div className="start d-flex flex-column align-items-center justify-content-around" style={{width:'250px',height:'100px',position:'relative',top:'0',bottom:'0',left:'0',right:'0',margin:'auto'}}>
        <input type="text" placeholder="Enter Name" className="startInput" style={{width:'100%',height:'35px',border:'none',borderRadius:'5px',textAlign:'center',fontSize:'18px'}} ref={inputRef} />
        <button className="startButton" style={{width:'70%',height:'30px',border:'none',borderRadius:'5px',cursor:'pointer',fontSize:'18px',fontWeight:'700'}} onClick={handleClick}> Start </button>
    </div>
  )
}
