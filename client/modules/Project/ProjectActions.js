import config from '../../config';

export function sendAddProject(projectName, projectDesc){
  return fetch(config.host + 'api/project/add', {
    method: 'POST',
    body: JSON.stringify({name: projectName, description: projectDesc}),
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

export function getAllProjects(){
  return fetch(config.host + 'api/project/getall', {
    method: 'GET',
    credentials: 'include',
  }).then(response => {
    return response;
  }).catch(error => {
    console.log("error");
    console.log(error);
    return null;
  });
};