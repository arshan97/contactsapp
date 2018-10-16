import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';

class AddContact extends Component {
	state = {
		name : '',
		email : '',
		phone : '',
		errors : {}
	}


	
	onSubmit = async (dispatch, e) => {
		e.preventDefault();

		const { name, email, phone } =this.state;

		//Check Errors
		if (name === ''){
			this.setState({errors : {name : 'Name is required!'}});
			return;
		}

		if (email === ''){
			this.setState({errors : {name : 'Name is required!'}});
			return;
		}

		if (phone === ''){
			this.setState({errors : {name : 'Name is required!'}});
			return;
		}


		const newContact = {
			name,
			email,
			phone,
			errors : {}
		}

		const res = await axios
		.post('https://jsonplaceholder.typicode.com/users' , newContact);
		 dispatch ({ type: 'ADD_CONTACT', payload : newContact});
		
		this.setState({
		name : '',
		email : '',
		phone : ''
	});
	};	

	onChange = (e) => {
			this.setState({ [e.target.name] : e.target.value });
		}

	render () {

		const { name, email, phone, errors } = this.state;

		return (
			<Consumer> 

			{value => {
				const {dispatch} = value;
				return (

			<div className = "card mb-3">
			<div className = "card-header"> Add Contact </div>
			<div className = "card-body"> 
			<form onSubmit = {this.onSubmit.bind(this, dispatch)} >

			<div className = "form-group">
			<label htmlFor = "name"> Name </label>
			<input type = "text" className = "form-control form-control-lg" name = "name" placeholder= "Enter Name..." value = {name}  onChange = {this.onChange}  error = {errors.name} />
			</div>

			<div className = "form-group">
			<label htmlFor = "email"> Email </label>
			<input type = "email" className = "form-control form-control-lg" name = "email" placeholder= "Enter Email..." value = {email} onChange = {this.onChange} error = {errors.email}  />
			</div>

			<div className = "form-group">
			<label htmlFor = "phone"> Phone </label>
			<input type = "phone" className = "form-control form-control-lg" name = "phone" placeholder= "Enter Phone..." value = {phone} onChange = {this.onChange} error = {errors.phone} />
			</div>

			<input type ="submit" value ="Add Contact" className ="btn btn-light btn-block" />

			</form> 
			</div>
			</div>

					)
			}} 


			</Consumer>
		)

	}
}


export default AddContact;