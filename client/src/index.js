import React from 'react';
import ReactDOM from 'react-dom';
import NotificationManager from './Components/NotificationManager';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Store, Persistor } from './Store/store';
import { BrowserRouter } from 'react-router-dom';
import './Styles/Main.css';

ReactDOM.render((
  <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor}>
      <BrowserRouter>
        <NotificationManager />
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'));
serviceWorker.unregister();
