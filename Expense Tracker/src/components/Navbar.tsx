
interface HeadingOjb{
    heading:string ;
}
const Navbar = (props:HeadingOjb) => {
  return (
    <div style={{
        height:'10vh' ,
        backgroundColor: 'lightblue',
        width: '100vw',
        fontSize: 'large',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        }}
        >

            {props.heading}
    </div>
  )
}

export default Navbar