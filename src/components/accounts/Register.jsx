import React, { Component } from 'react'
import { Input, Button, Icon } from 'antd'

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            correo: null,
            password: null,
            confirm_password: null,
        }
    }

    changeEmail = (e) => {
        this.setState({correo: e.target.value})
    }

    changePassword = (e) => {
        this.setState({password: e.target.value})
    }

    changeConfirmPassword = (e) => {
        this.setState({confirm_password: e.target.value})
    }

    comparePasswords = () => {
        this.state.password === this.state.confirm_password ?
            this.props.registerEmail(this.state.correo, this.state.password)        
        : alert("Las contraseñas no coinciden")
    }

    render(){
        const suffix = this.state.correo ? <Icon type="close-circle" onClick={this.clearEmail} /> : null 
        const { Password } = Input
        return (
            <div>
            {/* DIV FORM */}    
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
                Regístrate
            </p>
            <Input 
                prefix={<Icon type="user" style={{color: "#61B7C4"}} />}
                suffix={suffix}
                placeholder="Introduce tu correo"
                onChange={(e)=>this.changeEmail(e)}
            />

            <Password
            placeholder="Introduce tu contraseña"
            onChange={(e)=>this.changePassword(e)} 
            />

            <Password
            type="password" 
            placeholder="Confirmar tu contraseña" 
            onChange={(e)=>this.changeConfirmPassword(e)}
            />
            <Button 
                style={{backgroundColor: "#61B7C4", color: "#fff"}}
                shape="round" 
                icon="user-add" 
                size="small"
                onClick={this.comparePasswords}
                >
                    Agregar usuario
            </Button>
            </div>


            {/*DIV GOOGLE*/ }
            
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <img 
                style={{width: "100px", height: "100px", borderRadius: "50%"}}
                src="https://pbs.twimg.com/profile_images/988272404915875840/lE7ZkrO-_400x400.jpg"
                alt="Google Login"
                onClick={this.props.loginGoogle}
                />
                <p>Iniciar sesión con Google</p>
            </div>

            </div>
        )
    }
}
export default Register