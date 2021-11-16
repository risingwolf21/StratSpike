import './App.css';

import * as firebase from "firebase/app";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ViewSpikeStrat from './Components/ViewSpikeStrat';
import Home from './Components/Home';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = firebase.initializeApp(firebaseConfig);

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

function App() {

  return (
    <div className="App">
      <AlertProvider template={AlertTemplate} {...options}>
        {window.location.pathname === "/" ? (
          <Home app={app}/>
        ) : (
          <ViewSpikeStrat app={app} id={window.location.pathname.substring(1)}/>
        )}
      </AlertProvider>
    </div>
  );
}

export default App;
