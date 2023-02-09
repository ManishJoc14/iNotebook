//import react arrowfunction and export using rafce
import Notes from './Notes'

const Home = (props) => {
  const {showAlert}=props
  return (
    <div className="container">
        <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home
