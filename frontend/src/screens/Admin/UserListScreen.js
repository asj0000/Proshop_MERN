
import { LinkContainer } from "react-router-bootstrap"
import { Table , Button , Row  , Col} from "react-bootstrap"
import Loader from "../../components/Loader.js"
import Message from "../../components/Message.js"
import {  FaCheck, FaEdit , FaTrash , FaTimes } from "react-icons/fa"
import { toast } from 'react-toastify'
import  {useGetAllUsersQuery , useDeleteUserMutation}  from "../../slices/usersApiSlice.js"



const UserListScreen = () => {

  const { data:users , isLoading , isError , refetch}  = useGetAllUsersQuery()

  const [ deleteUser , {isLoading: loadingDelete }]  = useDeleteUserMutation()
 


  const deleteUserHandler = async(userId)=>{
    
   if(window.confirm('Are you sure ?')){
    try {
      await deleteUser(userId);
      refetch()
      toast.success('User Deleted')
    } catch (err) {
      toast.error(err?.data?.message  || err.error)
    }
   }

  }

  return (
    <>
    <Row className="align-items-center">
     <Col >
       <h2>Users</h2>
     </Col>
     </Row>

     { loadingDelete && <Loader/>}
    
     { isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{isError}</Message>
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            { users.map( ( oneUser )=>(
                  <tr key={oneUser._id}>
                    <td>{oneUser._id}</td>
                    <td>{oneUser.name}</td>
                    <td> <a href={ `mail to :${oneUser.email}`}>{oneUser.email}</a></td>
                    <td>{ oneUser.isAdmin ? (
                  <FaCheck style={{ color: 'green'}}/>
                ) : (
                  <FaTimes style={{ color: 'red'}}></FaTimes>
                ) }</td>
                    <td>
                      <LinkContainer to={ `/admin/user/${oneUser._id}/edit`}>
                         <Button variant="light"  className="btn-sm  mx-2">
                           <FaEdit/>
                         </Button>
                      </LinkContainer>
 
                        <Button variant='danger' onClick={ ()=> deleteUserHandler(oneUser._id) }>
                           <FaTrash  style={{color: 'white'}}/>
                         </Button>

                    </td>

                  </tr>
              ))}
            </tbody>
        </Table>
      )}

    </>
  )
}

export default UserListScreen