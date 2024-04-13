import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button , Form} from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

import { useGetSingleUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice';

const UserEditScreen = () => {
 
  const { id: userId } = useParams();
  const { data: userDetails , isLoading , refetch , error } = useGetSingleUserDetailsQuery(userId)
  const [ updateUser , { isLoading: loadingUpdate }] = useUpdateUserMutation()

  const [ name , setName] = useState('')
  const [ email , setEmail] = useState('')
  const [ admin , setIsAdmin] = useState(false)

  const navigate = useNavigate();


  useEffect(()=>{
        if(userDetails){
          setName(userDetails.name)
          setEmail(userDetails.email)
          setIsAdmin(userDetails.isAdmin)
        }

  },[userDetails])

  const submitHandler = async(e)=>{
     e.preventDefault()
     
     const newDetails = {
      userId: userId , name , email , admin
     }
     
     try {
      await updateUser(newDetails) 
      refetch()
      
 
      toast.success('User Detail Updated')
      navigate('/admin/userlist')
     } catch (err) {
      toast.error(err?.data?.message || err.error)
     }
  }

  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer >
        <h1>Edit User Details</h1>
        {loadingUpdate && <Loader />}

        { isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <Form onSubmit={ submitHandler }>
            <Form.Group controlId='name' className='my-2'>
             <Form.Label>Name</Form.Label>
             <Form.Control
               type='name'
               placeholder='Enter Name'
               value={name}
               onChange={ (e)=> setName(e.target.value) }
             >
             </Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Email '
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={admin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
              
              

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
         
          </Form>
        ) }
    </FormContainer>  
    
    
    </>
  )
}

export default UserEditScreen