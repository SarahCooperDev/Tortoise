import config from '../../config';

export function getProjectDetails(projectId){
  return fetch(config.host + 'api/project/getproject', {
    method: 'POST',
    body: JSON.stringify({projectId: projectId}),
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
