import { useState } from "react";
import { categories } from "../data/categories";



export default function Form() {

  const [acitivty,] = useState({
    category: 1,
    name: '',
    calories: 0
  })

  // const handleChange = (e) => {
  //   setAcitivty({
  //     ...acitivty,
  //     [e.target.id]: e.target.value
  //   })
  // }

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <div 
        className="grid grid-cols-1 gap-3"
      >
        <label htmlFor="category" className="font-bold">Categoría:</label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={acitivty.category}
          // onChange={handleChange}
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
          // onChange={handleChange}
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
          // onChange={handleChange}
        />
      </div>
      <input 
        type="submit" 
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
        value='Guardar'/>
    </form>
  )
}
