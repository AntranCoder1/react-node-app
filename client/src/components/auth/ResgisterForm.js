import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/Auth.context';
import AlertMessage from '../Layouts/AlertMessage';

const ResgisterForm = () => {

    // Context
    const { registerUser } = useContext(AuthContext);

    // Router
    const history = useHistory();

    // local state
    const [registerFrom, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password, confirmPassword} = registerFrom

    const onChangeRegisterForm = (event) => {
        setRegisterForm({ ...registerFrom, [event.target.name]: event.target.value })
    }

    const register = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Password do not match' })
            setTimeout(() => setAlert(null), 1000);
            return
        }

        try {
            const registerData = await registerUser(registerFrom);
            if (registerData.success) {
                history.push('/dashboard')
            } else {
                setAlert({type: 'danger', message: registerData.message})
                setTimeout(() => setAlert(null), 1000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <Form className="my-4" onSubmit={register}>
            <AlertMessage info={alert} />
        
            <Form.Group>
                <Form.Control 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    required 
                    value={username}
                    onChange={onChangeRegisterForm}     
                />
            </Form.Group>
            <Form.Group>
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    required 
                    value={password}
                    onChange={onChangeRegisterForm}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="confirmPassword" 
                    required
                    value={confirmPassword}
                    onChange={onChangeRegisterForm} 
                />
            </Form.Group>

            <Button variant="success" type="submit">Resgister</Button>
        </Form>
        <p>
            Already have an account?
            <Link to='/login'>
                <Button variant='info' size='sm' className='ml-2'>
                    Login
                </Button>
            </Link>
        </p>
    </>
    )
}

export default ResgisterForm;