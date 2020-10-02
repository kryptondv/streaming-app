import React, { Component } from 'react';

export class GoogleAuth extends Component {
  state = {
    isSignedIn: null
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'email',
      }).then(()=>{
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange();
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({isSignedIn: this.auth.isSignedIn.get()})
  }

  onSignIn = () => {
    this.auth.signIn();
  }

  onSignOut = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    switch(this.state.isSignedIn) {
      case true:
        return (
          <button onClick={this.onSignOut} className="ui red google button">
            <i className="google icon"></i>Sign Out
          </button>
        );
      case false:
        return (
          <button onClick={this.onSignIn} className="ui blue google button">
            <i className="google icon"></i>Sign In
          </button>
        );
      default:
        return null; 
    }
  }
  render() {
    return <div>
      {this.renderAuthButton()}
    </div>;
  }
}

export default GoogleAuth;
