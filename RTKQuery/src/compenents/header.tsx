import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';


import { useAddAnimalMutation ,useGetSpeciesQuery,useAddSpeciesMutation} from "./api/animalApiSlice";

const Values = {
  id: 0,
  name: "",
  image: "",
  species: ""
}

function Header() {
  const [showAddAnimalInput, setShowAddAnimalInput] = useState(false)
  const [valuesToSave, setValuesToSave] = useState(Values)
  const [addAnimal] = useAddAnimalMutation()
  const [showSpeciesForm, setShowSpeciesForm] = useState(false);

  const speciesData = useGetSpeciesQuery().data
  const [addNewSpecies] = useAddSpeciesMutation()

  const handleInputChange = (g: React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLSelectElement>) => {
    const target = g.target;
    const value = target.value;
    const name: string = target.name;
  

    setValuesToSave({
      ...valuesToSave,
      [name]: value,

    });
  }

  const saveChangesSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
   
    if (valuesToSave.name.length < 3 ){
      alert("Name should contain atleast 3 characters")
    } else if (!valuesToSave.name.match(/^[A-Za-z]+$/)) {
      alert("Name should contain letters")
     } else if(valuesToSave.name.length > 30) {
      alert("Name shouldn't be longer then 30 characters")
     }
     else if (!valuesToSave.image.match(/jpg/) && !valuesToSave.image.match(/png/) && !valuesToSave.image.match(/webp/) && !valuesToSave.image.match(/gif/)) {
      alert("link doesn't contain jpg, png, webp, gif formats")
     }  
     else if (!valuesToSave.image.match(/^(ftp|http|https):\/\/[^ "]+$/)) {
      alert("not correct format to picture link")
     }
     else {

    addAnimal({
        name: valuesToSave.name,
        image: valuesToSave.image,
        species: valuesToSave.species
    })

    //@ts-ignore
    if (!speciesData?.includes(valuesToSave.species)){
      addNewSpecies({species:valuesToSave.species})
    }

    setShowAddAnimalInput(false);
    setShowSpeciesForm(false);
    window.location.reload()
  }
  
  
  }

  
  return (

    <section className="Section container" id="hero" style={{ display: "grid", justifyContent: "center" }}>
      <div className="Hero">
        <h1 className="Hero__title">Animals</h1>
      </div>
      <p className="Hero__description">Add you animal here:</p>
      <button onClick={() => setShowAddAnimalInput(!showAddAnimalInput)}>Add Animal</button>
      {showAddAnimalInput &&
        <>
          <form
            action=""
            onSubmit={(e) => { saveChangesSubmit(e) }}
          >
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Animal name"
              name="name"
              onChange={(e) => handleInputChange(e)}
              required
            />
            <label htmlFor="">Image</label>
            <input
              type="text"
              placeholder="Animal image"
              name="image"
              onChange={(e) => handleInputChange(e)}
            />
         { showSpeciesForm ? 
              <>
            <label>Add species
            <input 
            type="text"
            placeholder="Animal species"
            name="species"
            onChange={(e) => handleInputChange(e)}
            />
            </label>
            </>
             : 
            (
              <>
              <label htmlFor=""> Choose Species 
              <button
               className="button button-clear"
              onClick={ () => setShowSpeciesForm(true)}
              > add new species</button>
              </label>
              <select 
              name="species" 
              onChange={(e) => handleInputChange(e)}
              >
              <option value="" disabled>Select dropdiwn</option>
             {speciesData?.map(items => (
              <option key={items.id} value={items.species}>{items.species}</option>
             ))}
              </select>
              </>
            )
            }
            <button>save my values</button>
          </form>
        </>
      }
    </section>
  )
}

export default Header
