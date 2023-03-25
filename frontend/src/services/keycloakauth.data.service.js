// Define frontend roles
const roles = {
    COURSELEADER: 'courseleader',
    TUTOR: 'tutor',
    STUDENT: 'student',
    ACADEMICADVISOR: 'academicadvisor',
    MODULELEADER: 'moduleleader'
  };
  
// Map Keycloak roles to frontend roles
const roleMapping = {
    [roles.COURSELEADER]: 'courseleader',
    [roles.TUTOR]: 'tutor',
    [roles.STUDENT]: 'student',
    [roles.ACADEMICADVISOR]: 'academicadvisor',
    [roles.MODULELEADER]: 'moduleleader'
  };

  //keycloak realm details
  let initOptions = {
    url: 'http://127.0.0.1:8080/', realm: 'sse', clientId: 'sse-client', onLoad: 'login-required'
  }