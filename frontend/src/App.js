import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { Container } from "react-bootstrap"

const App = () => {
  return (
    <>
    <Header/>
    <main className="py-3">
      <Container>
       <Outlet/>
      </Container>
    </main>
    <Footer/>
    </>
  )
}

export default App