import './Profile.css';
import { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { IDToken, UserClaims } from "@okta/okta-auth-js";

const Profile= () => {
	const { authState, oktaAuth} = useOktaAuth();
	const [userInfo, setUserInfo] = useState<UserClaims | null>(null);

	useEffect(() => {
		if(!authState || !authState.isAuthenticated) setUserInfo(null);
		else setUserInfo((authState.idToken as IDToken).claims);
	}, [authState, oktaAuth]);

	return (userInfo) ? (
		<div>
			<div className="profile">
				<h1>My User Profile (ID Token Claims)</h1>
				<p>
					Below is the information from your ID token which was obtained during the &nbsp;
					<a href="https://developer.okta.com/docs/guides/implement-auth-code-pkce">PKCE Flow</a>
					{' '}
					and is now stored in local storage.
				</p>
				<p>
					This route is protected with the
					{' '}
					<code>&lt;SecureRoute&gt;</code>
					{' '}
					component, which will ensure that this page cannot be accessed until you have
					authenticated.
				</p>
				<table>
					<thead>
					<tr>
						<th>Claim</th>
						<th>Value</th>
					</tr>
					</thead>
					<tbody>
					{Object.entries(userInfo).map((claimEntry) => {
						const claimName = claimEntry[0];
						const claimValue = claimEntry[1];
						const claimId = `claim-${claimName}`;
						return (
							<tr key={claimName}>
								<td>{claimName}</td>
								<td id={claimId}>{claimValue.toString()}</td>
							</tr>
						);
					})}
					</tbody>
				</table>
			</div>
		</div>
	) : (<div>
			<p>Fetching user profile...</p>
		</div>)
};

export default Profile;