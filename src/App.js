import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    username: '',
    email: '',
    pass: '',
    accept: false,
    info: '',

    errors: {
      username: false,
      email: false,
      pass: false,
      accept: false,
    }
  }

  warnings = {
    username_incorrect: 'Nazwa musi mieć co najmniej 10znaków i nie moze zawierac spacji.',
    email_incorrect: 'Adres email musi zawierac znak @',
    password_incorrect: 'Hasło musi miec 8 znaków',
    accept_incorrect: 'Brak potwierdzenia zgody.'
  }

  handleChange = (e)=> {
    const type = e.target.type;
    if(type==='text' || type==='email' || type==='password') {
        this.setState({
          [e.target.name]: e.target.value
        })
    } else {
      this.setState({
        [e.target.name]: e.target.checked
      })
    }
  }

  handleSubmit = (e)=> {
    e.preventDefault();

    const validation = this.formValidation();

    if(validation.correct) {
      this.setState({
        username: '',
        email: '',
        pass: '',
        accept: false,
        info: 'Formularz został wysłany',

        errors: {
          username: false,
          email: false,
          pass: false,
          accept: false,
        }
      }) 
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          pass: !validation.password,
          accept: !validation.accept,
        }
      })
    }
  }

  formValidation = ()=> {
      let username = false;
      let email = false;
      let password = false;
      let accept = false;
      let correct = false;

      if(this.state.username.length >= 10 && this.state.username.indexOf(' ') === -1) {
        username = true;
      }
      if(this.state.email.indexOf('@') !== -1) {
        email = true;
      }
      if(this.state.pass.length === 8) {
        password = true;
      }
      if(this.state.accept) {
        accept = true;
      }
      if(username && email && password && accept) {
        correct = true;
      }
      return ({correct, username, email, password, accept});
  }

  componentDidUpdate() {
    if(this.state.info !=='') {
      setTimeout(()=> {
        this.setState({
          info: ''
        })
      },3000)
    }
  }

  render() {
    const {username, email, pass, accept} = this.state;
    return (
      <div className='form'>
        <form onSubmit={this.handleSubmit} noValidate>
          <label htmlFor="username">
            <input name='username' id='username' type="text" value={username} onChange={this.handleChange} placeholder='nazwa'/>
            {this.state.errors.username && <span>{this.warnings.username_incorrect}</span>}
          </label>
          <label htmlFor="email">
            <input name='email' id='email' type="email" value={email} onChange={this.handleChange} placeholder='email'/>
            {this.state.errors.email && <span>{this.warnings.email_incorrect}</span>}
          </label>
          <label htmlFor="pass">
            <input name='pass' id='pass' type="password" value={pass} onChange={this.handleChange} placeholder='hasło'/>
            {this.state.errors.pass && <span>{this.warnings.password_incorrect}</span>}
          </label>
          <label htmlFor="accept">
            <input name='accept' type="checkbox" checked={accept} onChange={this.handleChange}/>
            {this.state.errors.accept && <span>{this.warnings.accept_incorrect}</span>}
          </label>
          <button>Wyślij</button>
        </form>
        {this.state.info && <h3>{this.state.info}</h3>}
      </div>
    )
  }
}

export default App;
