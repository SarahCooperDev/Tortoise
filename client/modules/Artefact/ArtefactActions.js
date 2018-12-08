import config from '../../config';

export function addArtefact(projectId, artType, artAddComment){
  return fetch(config.host + 'api/artefact/add', {
    method: 'POST',
    body: JSON.stringify({projectId: projectId, artType: artType, artAddComment: artAddComment}),
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

export function getArtefact(projectId, artId){
  return fetch(config.host + 'api/artefact/get', {
    method: 'POST',
    body: JSON.stringify({projectId: projectId, artId: artId}),
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