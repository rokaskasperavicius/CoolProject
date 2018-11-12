import React from 'react'
import { NotificationContainer } from 'react-notifications'
import App from './App'
import 'react-notifications/lib/notifications.css'

class NotificationManager extends React.Component {
  render() {
    return (
      <div>
        <App />
        <NotificationContainer />
      </div>
    );
  }
}

export default NotificationManager;