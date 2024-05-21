import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { AuthContextProvider } from './Context/AuthContext';
import { Profile, Header, Home, Signup, Login, ImageCard, ImageDetails, Footer} from './Components';
import { RequireAuth } from './routes/Layout';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className='flex flex-col h-screen'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route element={<RequireAuth />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/imagecard/:country' element={<ImageCard />} />
              <Route path='/imagedetails/:id' element={<ImageDetails />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
