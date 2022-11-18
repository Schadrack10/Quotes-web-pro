import { Route, Switch, Redirect } from 'react-router-dom'
import AllQuotes from './pages/AllQuotes';
import NewQuote from './pages/NewQuote';
import QuoteDetails from './pages/QuoteDetails';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';
import AuthContext from './store/auth-context';
import { AuthContextProvider } from './store/auth-context';
import UserProfile from './Profile/UserProfile';

import AuthPage from './pages/AuthPage';
import { useContext } from 'react';
import { initializeApp } from "firebase/app";
// import HomePage from './pages/HomePage';

//calling api manually, allowing us to access authenticated user
// import firebase from "firebase/app";
// import "firebase/auth";






// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6UEyv_qHPXflUjuqJf3cUlsmall5FOD0",
  authDomain: "quote-website-19a0e.firebaseapp.com",
  databaseURL: "https://quote-website-19a0e-default-rtdb.firebaseio.com",
  projectId: "quote-website-19a0e",
  storageBucket: "quote-website-19a0e.appspot.com",
  messagingSenderId: "767475549942",
  appId: "1:767475549942:web:db4f6dea2521e7ecfd0ed7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




function App() {


  const AuthCtx = useContext(AuthContext)
  const {isfederatedSignin} = useContext(AuthContext)

  // const user = firebase.auth().currentUser?.email;
  // const firstLetter = user[0].toUpperCase();


   console.log(isfederatedSignin)



  return (

    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
         <Route path='/quotes' exact>
        <AllQuotes />
        </Route>
       
        <Route path="/quotes/:quoteId">
          <QuoteDetails />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        {!AuthCtx.isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route>}
          {AuthCtx.isLoggedIn || isfederatedSignin && <Route path='/profile'>
          {AuthCtx.isLoggedIn || isfederatedSignin && <UserProfile /> } 
          {!AuthCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;






