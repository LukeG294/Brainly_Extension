import TaskInterface from "./taskInterface"

export default function ryverTask(){
  const handleKeyboard = ({ repeat, altKey, key }) => {
      if (repeat) return
      if ((altKey) && key === 't'){
          TaskInterface()
      }
    }

  document.addEventListener('keydown', handleKeyboard)
}