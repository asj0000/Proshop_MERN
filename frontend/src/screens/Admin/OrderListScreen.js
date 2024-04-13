import { LinkContainer } from "react-router-bootstrap"
import { Table , Button } from "react-bootstrap"
import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice.js"
import Loader from "../../components/Loader.js"
import Message from "../../components/Message.js"
import { FaTimes } from "react-icons/fa"


const OrderListScreen = () => {

  const { data: orders , isLoading , isError} = useGetAllOrdersQuery()
  
  return (
    <>
    <h2>Orders</h2>

    { isLoading ? <Loader/> : isError ? (
      <Message variant='danger'>
        {isError}
      </Message>
    ) : (
      <Table striped  hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          { orders.map(( Order )=>(
              <tr key={ Order._id}>
                <td>{ Order._id }</td>
                <td>{ Order.user && Order.user.name }</td>
                <td>{ Order.createdAt.substring( 0 ,10) }</td>
                <td>{ Order.totalPrice }</td>
                <td>{ Order.isPaid ? (
                  Order.paidAt.substring( 0 ,10)
                ) : (
                  <FaTimes style={{ color: 'red'}}></FaTimes>
                ) }</td>

              
             
              <td>
                  {Order.isDelivered ? (
                    Order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>

                <LinkContainer to={ `/order/${Order._id} `}>
                  <Button variant="light" className="btn-sm">
                    Details
                  </Button>
                </LinkContainer>
              </td>
              </tr>
          ))}
        </tbody>
      </Table>
    )}
    </>
  )
}

export default OrderListScreen