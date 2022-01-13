import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';

import React , {useEffect} from 'react'
//Router dependencies
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { loadUser } from './redux/actions/userActions'
import store from './redux/store'


import Header from './components/layout/Header'

//Home Dashboard
import Dashboard from './components/user/Dashboard';
//Actor
import ActorList from './components/admin/actors/ActorList';
import AddActor from './components/admin/actors/AddActor';
import UpdateActor from './components/admin/actors/UpdateActor';
import ActorDetails from './components/content/actor/ActorDetails';
//Producer
import Producer from './components/content/producer/Producer';
// import ProducerDetails from './components/admin/producers/ProducerDetails';
import AddProducer from './components/admin/producers/AddProducer';
import UpdateProducer from './components/admin/producers/UpdateProducer';
import ProducerList from './components/admin/producers/ProducerList';
//Movie
import Movie from './components/content/movie/Movie';
import MovieDetails from './components/content/movie/MovieDetails';
import MovieList from './components/admin/movies/MovieList';
import AddMovie from './components/admin/movies/AddMovie';
import UpdateMovie from './components/admin/movies/UpdateMovie';

//Actor
import Actor from './components/content/actor/Actor'

//Authentication
import SignUp from './components/user/SignUp';
import Login from './components/user/Login';




// import { useAlert } from 'react-alert'



function App() {
  
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  
  return (
    <Router>
    <div className="App">
      <Header/>
         {/* default path */}
        <Route path="/" component={Dashboard} exact/>
        <Route path="/movies" component={Movie} exact/>
        <Route path="/movies/search/:keyword" component={Movie} />
        <Route path="/admin/movie" component={MovieList} exact/>
        <Route path="/admin/new/movie" component={AddMovie} exact/>
        <Route path="/admin/edit/movie/:movieId" component={UpdateMovie} exact/>
        <Route path="/movie/:id" component={MovieDetails} exact />

        {/* Actor  */}
        <Route path="/actors" component={Actor} exact/>
        <Route path="/actors/search/:keyword" component={Actor} />
        <Route path="/admin/actor" component={ActorList} exact/>
        <Route path="/admin/new/actor" component={AddActor} exact />
        <Route path="/admin/edit/actor/:actorId" component={UpdateActor} exact/>
        <Route path="/admin/edit/actor/:actorId" component={UpdateActor} exact/>
        <Route path="/actor/:id" component={ActorDetails} exact />


        
        {/* Producer  */}
        <Route path="/producer" component={Producer} exact />
        <Route path="/admin/producer" component={ProducerList} exact />
        <Route path="/admin/new/producer" component={AddProducer} exact />
        <Route path="/admin/edit/producer/:producerId" component={UpdateProducer} exact/>
        {/* <Route path="/producer/:producerId" component={ProducerDetails} exact/> */}

        {/* Details page  */}
        


        <Route path="/signup" component={SignUp} exact/>
        <Route path="/login" component={Login} exact />

        {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
        {/* <Route path='*' component={NoMatch}/> */}
        
    </div>
        </Router>



  );
}

export default App;

// No Match Path (404 Not Found)
function NoMatch() {
  return (
      <div className="content content-wrapper">
      <h2>Not Found</h2>
      </div>
  );
}
