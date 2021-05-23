import URL from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };
  const fetchData = (role) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/" + role, options).then(handleHttpErrors);
  };

  const fetchStarWarsData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/filmsparallel",options).then(handleHttpErrors);
  };

  const fetchChuckNorrisData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/chuckjoke",options).then(handleHttpErrors);
  };

  const fetchClassPageData = () => {
    const options = makeOptions("GET", false); //True add's the token
    return fetch(URL + "/api/klasser/getall",options).then(handleHttpErrors);
  };
  
  const fetchCommentPageData = () => {
    const options = makeOptions("GET", false); //True add's the token
    return fetch(URL + "/api/comment/getall",options).then(handleHttpErrors);
  };

  const fetchTeacherPageData = () => {
    const options = makeOptions("GET", false); //True add's the token
    return fetch(URL + "/api/teacher/",options).then(handleHttpErrors);
  };
  

  const postcomment = (comment) => {
    const options = makeOptions("POST", true, comment); //True add's the token
    return fetch(URL + "/api/comment/newcomment", options).then(handleHttpErrors);
  };
    
  const postklasse = (klasse) => {
    const options = makeOptions("POST", true, klasse); //True add's the token
    return fetch(URL + "/api/klasser/newklasse", options).then(handleHttpErrors);
  };

  const postteacher = (teacher) => {
    const options = makeOptions("POST", true, teacher); //True add's the token
    return fetch(URL + "/api/teacher/newteacher", options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    fetchStarWarsData,
    fetchChuckNorrisData,
    fetchClassPageData,
    fetchCommentPageData,
    fetchTeacherPageData,
    postcomment,
    postklasse,
    postteacher
  };
}
const facade = apiFacade();
export default facade;
