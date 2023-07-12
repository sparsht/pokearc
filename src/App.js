import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import NotFound from './Pages/NotFound';
import AuthGuard from './auth.guard';

function App() {
  return (
    <Routes>
      <Route element={ <AuthGuard/> }>
        <Route path="/" element={ <><NavBar/><Dashboard/></> } />
      </Route>
      <Route path="/login" element={ <Login/> } />
      <Route path="/signup" element={ <SignUp/> } />
      <Route path="*" element={ <NotFound/> } />
    </Routes>
  );
}

export default App;
