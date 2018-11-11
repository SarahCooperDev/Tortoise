
export function sendSignUp(email, password){
    var host = 'http://localhost:8081/';
    console.log("In send sign up");
    console.log(email + password);

    return fetch(host + 'api/user/signup', {
        method: 'POST',
        body: JSON.stringify({email: email, password: password}),
        headers: {'Content-type': 'application/json'}
    }).then(response => {
        return response.status;
    }).catch(error => {
        console.log('error');
        console.log(error);
        return null;
    });
}