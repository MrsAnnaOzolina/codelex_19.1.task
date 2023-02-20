
// import { useState } from "react"
import { useGetAnimalsQuery, useDeleteAnimalMutation } from "./api/apiSlice";

const Table =() => {

const {
    data: animals,
    isLoading, 
    isSuccess,
} = useGetAnimalsQuery()

const [deleteAnimal] = useDeleteAnimalMutation()
// const [searchAnimal] = useSearchAnimalQuery()


let content;
if (isLoading) {
    return  <p>Loading...</p>
} else if (isSuccess){
    content = animals.map(({id, name,image,species})=> {
        return <tr key={id}>
          <th>{name}</th>
          <th><img src={image} alt="image" width="100px"/></th>
          <th>{species}</th>
          <th><button 
          name={`${id}`}  
          key={id}
          onClick={() => deleteAnimal({ id: id })}
          >X</button></th>
          </tr>
      
       })
         
} 
return (
  
 <div>
   
   <div>
    <form 
    
    >
    <label htmlFor="">
    Search  your favorite species
    </label>
    <input type="text"  
    placeholder="search species" 
    // onChange={(e)=> {searchAnimal({value: e.target.value })}}  
    />
    </form>
 
    <table style={{margin: "30px"}}>
  <thead>
    <tr>
      <th>Animal name</th>
      <th>Picture</th>
      <th>Species</th>
      <th>Delete</th>
    </tr>
  </thead>
 
  <tbody>
{content}
   

  </tbody> 
</table>  </div> 
 </div>
    )
  }
  
  export default Table
  