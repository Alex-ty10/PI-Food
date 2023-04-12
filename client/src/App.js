
import { Route, Switch, useLocation } from 'react-router-dom'
import Home from './components/Home/Home';
import DetailCard from './components/DetailCard/DetailCard';
import Landing from './components/Landing/Lading';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound';


function App() {
  let location = useLocation();
  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/create' component={Form} />
        <Route exact path='/recipes/:id' component={DetailCard} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
