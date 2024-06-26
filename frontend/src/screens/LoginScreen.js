import {useEffect, useState} from 'react'
import {Link , useLocation , useNavigate} from 'react-router-dom'
import {Form ,Button , Row , Col} from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import Loader from '../components/Loader.js'
import { useLoginMutation } from '../slices/usersApiSlice.js'
import { setCredential } from '../slices/authSlice.js'
import { toast } from 'react-toastify'
import FormContainer from '../components/FormContainer.js' 
import Meta from '../components/Meta.js'

const LoginScreen = () => {

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login ,{isLoading}] = useLoginMutation()

  const { userInfo } = useSelector((state)=> state.auth)

  const {search} = useLocation()

  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(()=>{
    
    if(userInfo){
      navigate(redirect)
    }
 
  },[userInfo , redirect , navigate])


  const submitHandler = async(e)=>{
      e.preventDefault()
      try{
        
        const res = await login({email , password}).unwrap()
        dispatch(setCredential({...res}))
        navigate(redirect)

      }catch(error){
        toast.error(error?.data?.message || error.error)
      }
  }


  return (
    
    <FormContainer>
      <Meta title='Login Page'/>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email Address</Form.Label>
           
            <Form.Control
              type = 'email'
              placeholder='Enter Email'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            ></Form.Control>
          
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
           
            <Form.Control
              type = 'password'
              placeholder='Enter password'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            ></Form.Control>
          
        </Form.Group>
        
        <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
          Sign In
        </Button>

        { isLoading && <Loader/>}

      </Form>
    
      <Row className='py-3'>
        <Col>
        New Customer ? 
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
           Register
          </Link>
        </Col>
      </Row>
       
    </FormContainer>
  )
}

export default LoginScreen