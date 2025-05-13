import logo from './assets/react.svg';
import './App.css';
import { useOktaAuth } from "@okta/okta-react";

const Home = () => {
	const { authState, oktaAuth} = useOktaAuth();
	const signin = async () => await oktaAuth.signInWithRedirect();
	const signout = async() => await oktaAuth.signOut();

	return (<>
		<img src={logo} className="App-Logo" alt="Logo"/>
		<div>
			{!authState?.isAuthenticated && (
				<>
					<button onClick={signin}>Sign In</button>
				</>
			)}
			{authState?.isAuthenticated && (
				<button onClick={signout}>Sign Out</button>
			)}
		</div>
		<p>Edit <code>src/Home.tsk</code> and save to reload.</p>
		<a></a>
	</>);
}

export default Home;