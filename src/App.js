import './App.css';
import Messenger from './components/Messenger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider';
import UserProvider from './context/UserProvider';

function App() {
  const clientId = "316764901541-r86je4f252u2uau1ka1jt3pdvjghct2i.apps.googleusercontent.com"
  return (
    <GoogleOAuthProvider clientId={clientId} >
      <UserProvider>
        <AccountProvider>
          <Messenger />
        </AccountProvider>
      </UserProvider>
    </GoogleOAuthProvider  >
  );
}

export default App;
