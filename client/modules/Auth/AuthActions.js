import config from '../../config';

export function sendSignUp(email, username, password){
    console.log("In send sign up");
    console.log(email + password + username);

    return fetch(config.host + 'api/user/signup', {
        method: 'POST',
        body: JSON.stringify({email: email, password: password, username: username}),
        credentials: 'include',
        headers: {'Content-type': 'application/json'}
    }).then(response => {
        return response;
    }).catch(error => {
        console.log('error');
        console.log(error);
        return null;
    });
}

export function sendSignIn(email, password){
    console.log(config.host);
    console.log("In send sign in");
    console.log(email + password);

    return fetch(config.host + 'api/user/signin', {
        method: 'POST',
        body: JSON.stringify({email: email, password: password}),
        credentials: 'include',
        headers: {'Content-type': 'application/json'}
    }).then(response => {
        return response;
    }).catch(error => {
        console.log('error');
        console.log(error);
        return null;
    });
}