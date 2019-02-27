import React, { Component } from 'react'
import { Input, Button, Icon } from 'antd'
import firebase from 'firebase'
class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nombre: null,
            apellidos: null,
            telefono: null
        }
    }

    componentDidMount = async() => {
        await console.log(this.props.user.uid)        
        let uid = await this.props.user.uid
        await this.props.db.collection('users').doc(uid).get()
            .then(async(doc)=>
                doc.exists ?
                    doc.data().name != null ?
                        await this.setState({nombre: doc.data().name})
                    : null
                : await alert("No existeeeeeees")
            )
            .catch(async(err)=>{
                await console.log(err)
                await alert("Hubo un error")
            })
    }

    changeName = (e) => {
        this.setState({nombre: e.target.value})
    }

    changeLastName = (e) => {
        this.setState({apellidos: e.target.value})
    }

    changePhone = (e) => {
        this.setState({telefono: e.target.value})
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
                this.state.nombre ?
                    this.state.nombre != null ? 
                    <Input 
                    prefix={<Icon type="user" style={{color: "#61B7C4"}} />}
                    placeholder="Nombre"
                    onChange={(e)=>this.changeName(e)}
                    />
                : null
                :null
            }
           

            <Input 
                prefix={<Icon type="user" style={{color: "#61B7C4"}} />}
                placeholder="Apellidos"
                onChange={(e)=>this.changeLastName(e)}
            />

            <Input 
                prefix={<Icon type="user" style={{color: "#61B7C4"}} />}
                placeholder="Teléfono"
                onChange={(e)=>this.changePhone(e)}
            />
           
            <Button 
                style={{backgroundColor: "#61B7C4", color: "#fff"}}
                shape="round" 
                icon="user-add" 
                size="small"
                onClick={this.comparePasswords}
                >
                    Actualizar perfil
            </Button>
            </div>
        )
    }
}

export default Profile