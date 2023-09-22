export default function Button({text, onClick, type='button', className}){
  return(
    <>
      <button type={type} className={className} onClick={onClick}>{text}</button>
    </>
  )
}