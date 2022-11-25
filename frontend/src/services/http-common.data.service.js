var jwt = require('jwt-decode');
class HTTPCommonDataService {

    getCookie = (name) => 
    {
        let value = "; " + document.cookie;
        let parts = value.split(`; ${name}=`);
        if (parts.length == 2) 
        {
            return parts.pop().split(";").shift();
        }

        return null;
      }

    deleteCookie = (name) => 
    {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    getApplicationUser = () =>
    {
        let token = this.getCookie("token");
        if (token) {
            return jwt.decode(token);
        }
        return null;
    }
}

export default new HTTPCommonDataService();
