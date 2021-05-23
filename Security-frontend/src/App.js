import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import WelcomePage from "./welcomePage";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Table from 'react-bootstrap/Table';
import { Switch, Route, NavLink } from "react-router-dom";
import AddComment from "./addcomment";
import AddKlasse from "./addklasse";
import AddTeacher from "./addteacher";

function Header({ loggedIn, role }) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/LoginPage">
          {loggedIn ? (<>Logout</>) : (<>Login</>)} Login
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/TeacherPage">
            
            </NavLink>
      </li>
      <li>
          <NavLink activeClassName="selected" to="/ClassPage">
            ClassPage
            </NavLink>
      </li>
        <li>
          <NavLink activeClassName="selected" to="/CommentPage">
            CommentPage 
            </NavLink>
            </li>
            {loggedIn && role =="admin" && (
            <li>
            <NavLink activeClassName="selected" to="/AddComment">
          AddComment
            </NavLink>
            
            <li>
              <NavLink activeClassName="selected" to="/AddKlasse">
                AddKlasse
              </NavLink>
            </li>
            <NavLink activeClassName="selected" to="/AddTeacher">
                AddTeacher
              </NavLink>
            </li>
            
     )}
      );    
      </ul>
    </div>
  );
      }

function Home() {
  return <WelcomePage />;
}

function LoginPage({ setLoggedIn, loggedIn, setRole }) {
  const [loggedInError, setLoggedInError] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true))
      .catch((err) => err.fullError)
      .then((data) => setLoggedInError(data));
  };

  if (loggedInError) {
    return (
      <div>
        <LogIn login={login} />
        <h3>{loggedInError.message}</h3>
      </div>
    );
  }

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn setRole={setRole} />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

function ClassPage() {
  // Const er en form for hook. Den laver en variabel som kan arbejde med resultatet efter rendering. 
   const [fetchData, setFetchData] = useState([]);
  
 
   useEffect(() => {
     facade.fetchClassPageData().then((data) => setFetchData(data)); 
     //Tomt array betyder at den kun renderes én gang, og kun en gang. 
   }, []);
 
   return (
     <Table striped bordered hover>
 <thead>
   <tr>
     <th>Number of students:</th>
     <th>Semester:</th>
     <th>Course ID:</th>
     
     
   </tr>
   </thead>
 <tbody>
 {MapUsers(fetchData)}
 </tbody>
 </Table>
 
   )
 
  function MapUsers(fetchData){
 return fetchData.map((data) => {
 console.log(data.id) 
   return(
   <tr>
    <td>{data.numberOfStudents}</td>
    <td>{data.semester}</td> 
    <td>{data.id}</td> 
   </tr>
  )
 })

 }
}

function CommentPage() {
  // Const er en form for hook. Den laver en variabel som kan arbejde med resultatet efter rendering. 
   const [fetchData, setFetchData] = useState([]);
  
 
   useEffect(() => {
     facade.fetchCommentPageData().then((data) => setFetchData(data)); 
     //Tomt array betyder at den kun renderes én gang, og kun en gang. 
   }, []);
 
   return (
     <Table striped bordered hover>
 <thead>
   <tr>
     <th>Comments:</th>
   
     
   </tr>
   </thead>
 <tbody>
 {MapUsers(fetchData)}
 </tbody>
 </Table>
 
   )
 
  function MapUsers(fetchData){
 return fetchData.map((data) => {
 console.log(data.id) 
   return(
   <tr>
    <td>{data.comment}</td>
  
   </tr>
  )
 })

 }
}
function TeacherPage() {
  // Const er en form for hook. Den laver en variabel som kan arbejde med resultatet efter rendering. 
   const [fetchData, setFetchData] = useState([]);
  
 
   useEffect(() => {
     facade.fetchTeacherPageData().then((data) => setFetchData(data)); 
     //Tomt array betyder at den kun renderes én gang, og kun en gang. 
   }, []);
 
   return (
     <Table striped bordered hover>
 <thead>
   <tr>
     <th>Name of Teacher:</th>
     <th>Email:</th>
     
   </tr>
   </thead>
 <tbody>
 {MapUsers(fetchData)}
 </tbody>
 </Table>
 
   )
 
  function MapUsers(fetchData){
 return fetchData.map((data) => {
  
   return(
   <tr>
    <td>{data.name}</td>
    <td>{data.email}</td> 
  
   </tr>
  )
 })

 }
}





function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
function LoggedIn({setRole}) {
  const [dataFromServer, setDataFromServer] = useState("");
  const jwt = require("jsonwebtoken");
  const token = localStorage.getItem("jwtToken");
  const role = jwt.decode(token).roles;

  let roleToFetch = role;
  if (roleToFetch === "admin,user") {
    roleToFetch = "admin";
  }
  useEffect(() => {
    setRole(roleToFetch)
    facade.fetchData(roleToFetch).then((data) => setDataFromServer(data.msg));
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      <h3>Role: {role}</h3>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState();


  return (
    <div>
      <Header loggedIn={loggedIn} role={role} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/LoginPage">
          <LoginPage setLoggedIn={setLoggedIn} setRole={setRole} loggedIn={loggedIn} />
        </Route>

        <Route exact path="/ClassPage">
          <ClassPage/>
        </Route>

        <Route exact path="/CommentPage">
          <CommentPage />
        </Route>
        <Route exact path="/AddComment">
          <AddComment/>
        </Route>
        <Route exact path="/AddKlasse">
          <AddKlasse/>
        </Route>
        <Route exact path="/AddTeacher">
          <AddTeacher/>
        </Route>
        <Route exact path="/TeacherPage">
          <TeacherPage/>
        </Route>
      </Switch>
    </div>
  );
}


export default App;
