import {AppContext} from './context/ContextApi'
import { Feed, SearchResult, Header, VideoDetails,  } from './components'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  

  return (
    <AppContext>
      <BrowserRouter>
        <div className=' flex flex-col h-full'>
          <Header />
          <Routes>
              <Route exact path='/' element={<Feed />} /> 
              <Route path='/searchResult/:searchQuery' element={<SearchResult />} />
              <Route path='/video/:id' element={<VideoDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  )
}

export default App
