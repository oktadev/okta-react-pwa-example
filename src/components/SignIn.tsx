import { useOktaAuth } from "@okta/okta-react";

const SignIn = () => {
	const { oktaAuth} = useOktaAuth();
	const signin = async () => await oktaAuth.signInWithRedirect();

	return (<div className="sign-in layout">

		<h2> <img src="/pwa-192.png" className="logo" alt="Logo"/> Lister</h2>
		<button className="outlined" onClick={signin}>Sign In</button>
	</div>);
}

export default SignIn;