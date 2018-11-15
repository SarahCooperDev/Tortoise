import config from '../../../config';

export function sendAddProject(projectName){
    return fetch(config.host + 'api/project/add', {
      method: 'POST',
      body: JSON.stringify({name: projectName}),
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