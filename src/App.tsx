import { Route, Switch, useHistory } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import Home from './Home';
import Profile from './Profile';

const oktaAuth = new OktaAuth({
    clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
    issuer: `https://${import.meta.env.VITE_OKTA_DOMAIN}`,
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email', 'offline_access'],
} as any) ;


function App() {
    const history = useHistory();
    const restoreOriginalUri = (_oktaAuth: OktaAuth,  originalUri: string) => {
        history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    };

    return (
        <>
            <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login/callback" component={LoginCallback}/>
                    <Route path="/profile" component={Profile}/>
                </Switch>
            </Security>
        </>
    );
}

export default App