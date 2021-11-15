import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/Auth.context';
import AlertMessage from '../Layouts/AlertMessage';

const LoginForm = () => {

    // Context
    const { loginUser } = useContext(AuthContext);

    // Router
    const history = useHistory();

    // local state
    const [loginFrom, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password} = loginFrom

    const onChangeLoginForm = (event) => {
        setLoginForm({ ...loginFrom, [event.target.name]: event.target.value })
    }

    const login = async event => {
        event.preventDefault();
        try {
            const loginData = await loginUser(loginFrom);
            if (loginData.success) {
                history.push('/dashboard')
            } else {
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(() => setAlert(null), 1000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control 
                        type="text" 
                        placeholder="Username" 
                        name="username" 
                        required 
                        value={username} 
                        onChange={onChangeLoginForm}    
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        required 
                        value={password}
                        onChange={onChangeLoginForm}     
                    />
                </Form.Group>

                <Button variant="success" type="submit">Login</Button>
            </Form>
            <p>
				Don't have an account?
				<Link to='/resgister'>
					<Button variant='info' size='sm' className='ml-2'>
						Register
					</Button>
				</Link>
			</p>
        </>
    )
}

export default LoginForm