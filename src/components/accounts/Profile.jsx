import React, { Component } from 'react'
import { Input, Button, Icon } from 'antd'
import firebase from 'firebase'
class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            profileUser: {
                name: null,
                apellidos: null,
                telefono: null,
                edad: null
            }
        }
    }

    componentDidMount = () => {
        let uid = this.props.match.params.uid
        firebase.firestore().collection('users').doc(uid).get()
            .then((doc)=>{
                if(doc.exists){
                    let aux = {
                        name: doc.data().name,
                        apellidos: doc.data().apellidos,
                        telefono: doc.data().telefono,
                        edad: doc.data().edad
                    }
                    this.setState({user: doc.data(), profileUser: aux})
                }
                else
                {
                    console.log("NO")
                }
            })
    }

    changeName = (e) => {
        let data = this.state.profileUser
        data.name = e.target.value
        this.setState({profileUser: data})
    }

    changeLastName = (e) => {
        let data = this.state.profileUser
        data.apellidos = e.target.value
        this.setState({profileUser: data})
    }

    changePhone = (e) => {
        let data = this.state.profileUser
        data.telefono = e.target.value
        this.setState({profileUser: data})
    }

    changeEdad = (e) => {
        let data = this.state.profileUser
        data.edad = e.target.value
        this.setState({profileUser: data})
    }

    updateProfile = () => {
        let ref = firebase.firestore().collection('users').doc(this.props.match.params.uid)
        ref.update({
            name: this.state.profileUser.name,
            apellidos: this.state.profileUser.apellidos,
            telefono: this.state.profileUser.telefono,
            edad: this.state.profileUser.edad
        })
        .then(()=>{
            alert("Datos actualizados correctamente")
        })
        .catch(err=>{
            alert("OCurrió un error al actualizar información")
            console.log(err)
        })
    }

    render(){
        return(
            <div style={{
                height: "50vh",
                width: "50vw",
                marginLeft: "25vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center"
            }}>
            <p style={{
                fontSize: "2em",
                fontWeight: "700"
            }}>
                Perfil 
            </p>

            {
                this.state.user ?
               this.state.user.name ?
               <Input 
               prefix={<Icon type="user" style={{color: "#61B7C4"}} />}
               placeholder="Nombre"
               value={this.state.profileUser.name}
               onChange={(e)=>this.changeName(e)}
           />
                :null
                 :null
            }
           
            {
                this.state.user ? 
                    this.state.user.apellidos ?
                    <Input 
                    prefix={<Icon type="user" style={{color: "#61B7C4"}} />}
                    placeholder="Apellidos"
                    value={this.state.profileUser.apellidos}
                    onChange={(e)=>this.changeLastName(e)}
                    />
                    : 
                    null
            : null
            }

            {
                this.state.user ?
                    this.state.user.telefono ?
                    <Input 
                    prefix={<Icon type="user" style={{color: "#61B7C4"}} />}
                    placeholder="Teléfono"
                    value={this.state.profileUser.telefono}
                    onChange={(e)=>this.changePhone(e)}
                    />
                    :
                   null
            : null
            }

            {
                this.state.user ?
                    this.state.user.edad ?
                    <Input 
                    prefix={<Icon type="user" style={{color: "#61B7C4"}} />}
                    placeholder="Edad"
                    value={this.state.profileUser.edad}
                    onChange={(e)=>this.changeEdad(e)}
                    />
                    :
                    null
            : null
            }

            
           
            <Button 
                style={{backgroundColor: "#61B7C4", color: "#fff"}}
                shape="round" 
                icon="user-add" 
                size="small"
                onClick={this.updateProfile}
                >
                    Actualizar perfil
            </Button>
            </div>
        )
    }
}

export default Profile