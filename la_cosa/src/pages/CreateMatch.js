import Input from "../atoms/Input";

export default function CreateMatch (){
  return (
    <>
      <h4>Elija Nombre de la partida</h4>
      <Input type='text' id='matchName' name='matchName' onChange={()=>{}}/>
      <Button text='Crear Partida' onClick={()=>{}}/>
    </>
  )
}