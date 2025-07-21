# Create a React PWA with Social Login Authentication

This repository shows you how to build a React Progressive Web Application (PWA) secured by Okta with Social Login.

Please read [Create a React PWA with Social Login Authentication][blog] to see how it was created.

**Prerequisites:**

- [Node.js](https://nodejs.org/en/)
- An IDE such as [Visual Studio Code](https://code.visualstudio.com/)
> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.
- [Google Cloud Console Account](https://console.cloud.google.com/)

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To pull this example, first create an empty GitHub repo.  Next run the following commands:

```bash
git clone --bare https://github.com/oktadev/okta-react-pwa-example.git
cd okta-react-pwa-example
npm ci
```

### Create an OIDC Application in Okta

Before you begin, you’ll need an [Okta Integrator Free Plan account](https://developer.okta.com/login). Once you have an account, sign in. Next, in the Admin Console:

1. Go to **Applications** > **Applications**
2. Click **Create App Integration**
3. Select **OIDC - OpenID Connect** as the sign-in method
4. Select **Single-Page Application** as the application type, then click **Next**
5. Enter an app integration name
6. In the **Grant type** section, ensure both **Authorization Code** and **Refresh Token** are selected
7. Configure the redirect URIs:
     * Sign-in redirect URIs: `http://localhost:5173/login/callback`
     * Sign-out redirect URIs: `http://localhost:5173`
8. In the **Controlled access** section, select the appropriate access level
9. Click **Save**
10. 

Creating an OIDC Single-Page App manually in the Admin Console configures your Okta Org with the application settings. You may also need to configure trusted origins for `http://localhost:5173` in **Security** > **API** > **Trusted Origins**.

After creating the app, you can find the configuration details on the app's **General** tab:

  * **Client ID**: Found in the **Client Credentials** section
  * **Issuer**: Found at in the dropdown menu when opening your profile menu

```
Issuer:    https://dev-133337.okta.com
Client ID: 0oab8eb55Kb9jdMIr5d6
```

NOTE: You can also use the Okta CLI Client or Okta PowerShell Module to automate this process. See this guide for more information about setting up your app.

### Configure Social Login in Google Cloud

First, we'd need to sign up for Google Workspace and create a Google project. After that, we configure Google as an Identity Provider (IDP). Follow the [instructions to set up Google for Social Login from Okta Developer documentation](https://developer.okta.com/docs/guides/social-login/google/main/).

When you define the OAuth consent screen in Google Cloud, use the following configuration:
  1. Add `http://localhost:5173` to your authorized JavaScript Origins - this is the test server for our React application.
  2. Add `https://{yourOktaDomain}/oauth2/v1/authorize/callback` to the Authorized redirect urls session. Replace `{yourOktaDomain}` with your actual Okta domain.

When adding the required scopes in Google Cloud, include the `./auth/userinfo.email`, `./auth/userinfo.profile`, and the `openid` scopes.


### Configure Google as an Identity Provider in Okta

After setting up Google Cloud, you'll configure Okta. Use the following values:
1. Enable automatic account linking to make it easier for users with an Okta account to sign in with Google. 
2. Add [routing rules](https://help.okta.com/en-us/content/topics/security/configure-routing-rules.htm?) to allow all logins to use Google Social Login.

## Links

This example uses the following open source libraries from Okta:

* [Okta with React](https://developer.okta.com/code/react/)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://developer.okta.com/blog/2025/07/22/react-pwa
