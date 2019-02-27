import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import HeaderComponent from './components/common/Header'
import FooterComponent from './components/common/Footer'
import Home from './components/home/Home'
import Register from './components/accounts/Register'
import Login from './components/accounts/Login'
import Profile from './components/accounts/Profile'

import firebase from 'firebase'

class App extends Component {

  constructor(props) {
    super(props)
    this.db = firebase.firestore()
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user})
      }
      else {
        console.log("No estas logeado")
      }
    })
  }

  iniciarSesion = (e, email, password) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user)=>{
        alert("Usuario loggeado correctamente")
        console.log(user)
      })
      .catch((err)=>{
        alert("No se pudo loggear")
        console.log(err)
      })
  }

  loginGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(response=>{
        console.log(response.user)
        this.db.collection('users').doc(response.user.uid).set({
          uid: response.user.uid,
          name: response.user.displayName,
          photo: response.user.photoURL,
          email: response.user.email,
          provider: "Google"
        })
        window.location.assign(`/profile/${response.user.uid}`)
      })
      .catch(err=>console.log(err))
  }

  registerEmail = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response)=>{
        //console.log(response.user)
        this.db.collection('users').doc(response.user.uid).set({
          uid: response.user.uid,
          email: response.user.email,
          provider: "email"
        })
        alert("Se ha registrado el usuario correctamente")
        window.location.assign(`/profile/${response.user.uid}`)
      })
      .catch((err)=>{
        console.log(err)
        alert("Ha ocurrido un eror al registrar")
      })
  }

  logout = () => {
    firebase.auth().signOut()
      .then(()=>alert("Se ha cerrado la sesión correctamente"))
      .catch(err=>console.log(err))
    this.setState({user: null})
  }

  render() {
    return (
      <Layout>
        <HeaderComponent 
        user={this.state.user}
        logout={this.logout}/>
        <div style={{height: "80vh"}}>
        <Switch>

          <Route exact path="/" component={Home} />

          <Route 
            exact path="/register" 
            render={()=> 

            <Register
              loginGoogle={this.loginGoogle}
              user={this.state.user}
              logout={this.logout}
              registerEmail={this.registerEmail}
            />} 

          />

          <Route 
            exact path="/login"
            render={()=><Login iniciar={this.iniciarSesion} />}
          />

          <Route
          exact path="/profile/:uid"
          //render={()=><Profile user={this.state.user} db={this.db} />}
          component={Profile}
          />

        </Switch>
        </div>
        <FooterComponent />
      </Layout>
    );
  }
}

export default App;
