import { useReducer, useEffect } from "react"
import Formulario from "./components/Formulario"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {
 
  const [state, dispatch]= useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp: boolean= state.activities.length > 0

  return (
    <>
     <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
           <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorías diarias
           </h1>

           <button 
           className="bg-green-400 hover:bg-green-800 p-2 font-bold uppercase text-white
            cursor-pointer rounded-lg text-sm font-serif disabled:opacity-10" disabled={!canRestartApp} onClick={() => dispatch({type: 'restart-app'})} >
            Reiniciar App</button>
        </div>
     </header>

     <section className="bg-lime-500 py-20 px-5">
       <div className="max-w-4xl mx-auto">
          <Formulario dispatch={dispatch} state={state}/>
       </div>
     </section>

       <section className="bg-gray-800 py-10">
           <div className="max-w-4xl mx-auto">
               <CalorieTracker  activities={state.activities} />
           </div>
       </section>

     <section className="p-10 mx-auto max-w-4xl">
         < ActivityList activities={state.activities}
         dispatch={dispatch} />
     </section>

    </>
  )
}

export default App
