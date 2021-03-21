import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useContext, useState } from "react";
import { userContext, UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./Login.css";
import { useForm } from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";

firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    photo: "",
  });

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleGoogleSingIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signInUser);
        setLoggedInUser(signInUser);
      })

      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleFacebookSingIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((res) => {
        var credential = res.credential;

        var user = res.user;
        const { displayName, email, photoURL } = res.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signInUser);
        setLoggedInUser(signInUser);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        var email = error.email;
      });
  };

  const handleSubmit = (e) => {
    console.log(user.email, user.password,user.name);
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          
          setUser(newUserInfo);
          displayUserName(user.name);
          console.log(newUserInfo);

          // ...
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorMessage, errorCode);
          // ..
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          
          const newUserInfo = { ...user};
          newUserInfo.error = "";
          newUserInfo.success = true;
          setLoggedInUser(newUserInfo);
          history.replace(from);
          setUser(newUserInfo);
          console.log(newUserInfo)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }

    e.preventDefault();
  };

  

  const handleChange = (e) => {
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /^[^\s@]+@[^\s@]+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if(e.target.name === "confirmpassword"){
      const isPasswordValid = e.target.value > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
      
    }

    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState()

  const displayUserName = (name) => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const checkPassword =(e) => {
    const pass = e.target.value;
      setConfirmPassword(pass);
      if(password != pass ){
          setError('password not match');
      }
      else
        setError('');
  }

  return (
    <div>

      <div className="login">
        <form onSubmit={handleSubmit}>
          {newUser && <h4>Create an account</h4>}
          {newUser && (
            <input
              name="name"
              type="text"
              onBlur={handleChange}
              placeholder="name"
            />
          )}
          <br />
          {!newUser && <h4>Login</h4>}
          <input
            type="text"
            name="email"
            onBlur={handleChange}
            id=""
            placeholder="email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            onBlur={handleChange}
            onChange={(e) => setPassword(e.target.value)}
            id=""
            placeholder="password"
            required
          />
          <br />
          {newUser && (
            <input
              type="password"
              name="confirmpassword"
              onBlur={handleChange}
              onChange={(e)=>checkPassword(e)}
              id=""
              placeholder="Confirm password"
              required
            />
          )}
          <p >{error}</p>
          <br />
          <br />
          <input
            type="submit"
            value={newUser ? "Create an account" : "Login"}
          />
        </form>
        {!newUser && <label>Don't have an account </label>}
        {!newUser && (
          <label name="newUser" id="">
            <Link onClick={() => setNewUser(!newUser)}> create a account</Link>
          </label>
        )}
        {newUser && <label>Already have an account</label>}
        {newUser && <Link onClick={() => setNewUser(!newUser)}>login</Link>}
        <p style={{ color: "red" }}> {user.error}</p>
        {user.success && (
          <p style={{ color: "green" }}>
            user {newUser ? "created" : "Loggin"} successfully
          </p>
        )}
      </div>
      <div className="signIn">
        <h5 style={{ color: "white"}}>Or</h5>
        <button Continue onClick={handleGoogleSingIn}><GrFacebook/>
          Continue with Facebook
        </button>
        <br />
        <button onClick={handleFacebookSingIn}><FcGoogle/>Continue with Google</button>
      </div>
    </div>
  );
}

export default Login;
