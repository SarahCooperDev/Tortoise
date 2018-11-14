import config from '../../config';

export function sendVerifyRequest(){
  return fetch(config.host + 'api/user/verify', {
    method: 'POST',
    body: JSON.stringify({}),
    credentials: 'include',
    headers: {'Content-type': 'application/json'}
  }).then(response => {
    return response;
  }).catch(error => {
    console.log("error");
    console.log(error);
    return null;
  });
};