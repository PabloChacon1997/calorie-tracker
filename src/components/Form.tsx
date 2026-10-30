import { useEffect, useState, type Dispatch } from "react";

import { categories } from "../data/categories";
import type { Activity } from "../types";
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>
  state: ActivityState
}

export default function Form({ dispatch, state }: FormProps) {

  const [acitivty, setAcitivty] = useState<Activity>({
    id: crypto.randomUUID(),
    category: 1,
    name: '',
    calories: 0
  })

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAcitivty(selectedActivity)
    }
  }, [state.activeId])
  

  const handleChange = ( e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement> | React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id);

    setAcitivty({
      ...acitivty,
      [e.target.id]: isNumberField ? +e.target.value: e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, calories } = acitivty

    return name.trim() !== '' && calories > 0;
  }

  const handleSubmit = ( e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'save-activity' , payload: {newActivity: acitivty}})
    setAcitivty({
      id: crypto.randomUUID(),
      category: 1,
      name: '',
      calories: 0
    })
  }

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div 
        className="grid grid-cols-1 gap-3"
      >
        <label htmlFor="category" className="font-bold">Categoría:</label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={acitivty.category}
          onChange={handleChange}
        >
          {
            categories.map(category => (
              <option
                key={category.id}
                value={category.id}
              >{category.name}</option>
            ))
          }
        </select>
      </div>
      <div 
        className="grid grid-cols-1 gap-3"
      >
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input 
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja"
          value={acitivty.name}
          onChange={handleChange}
        />
      </div>
      <div 
        className="grid grid-cols-1 gap-3"
      >
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input 
          type="text"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias: ej. 300 o 500"
          value={acitivty.calories}
          onChange={handleChange}
        />
      </div>
      <input 
        type="submit" 
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={acitivty.category === 1 ? 'Guardar comida':'Guardar ejercicio'}
        disabled={!isValidActivity()}/>
    </form>
  )
}
