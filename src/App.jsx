import './App.css'
import Header from './components/Header/Header'
import MainPage from './components/MainPage/MainPage'
import MoviePage from './components/MoviePage/MoviePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/film' element={<MoviePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
