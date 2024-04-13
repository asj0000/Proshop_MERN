import { useEffect } from 'react'
import {Link , useParams} from 'react-router-dom'
import { Row, Col , ListGroup , Image , Button , Card} from 'react-bootstrap'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { PayPalButtons , usePayPalScriptReducer } from '@paypal/react-paypal-js'

import { useGetOrderDetailsQuery , 
        usePayorderMutation , 
        useGetPayPalClientIdQuery,
      useSetDeliveryStatusMutation, } from '../slices/ordersApiSlice.js'

import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const OrderScreen = () => {

  const { id: orderId } =   useParams()

  const { data: order ,refetch, isLoading , isError} =  useGetOrderDetailsQuery(orderId)
  console.log(order)
  
  const [ payOrder , { isLoading : loadingPay }] = usePayorderMutation()
  console.log(payOrder)
  
  const [{ isPending} , paypalDispatch] = usePayPalScriptReducer()
  
  const { data: paypal , isLoading: loadingPaypal , error: errorPayPal } = useGetPayPalClientIdQuery()
  console.log(paypal)
  
  const { userInfo } = useSelector((state) => state.auth)

  const  [ deliverOrder , {isLoading: loadingDeliver}] = useSetDeliveryStatusMutation()

  useEffect(()=>{
     
      if(!errorPayPal && !loadingPaypal && paypal.clientId){
        const loadPayPalScript = async()=>{
          paypalDispatch({
            type: 'resetOptions',
            value: {
              'client-id' : paypal.clientId,
              currency: 'USD',
            }
          });
          paypalDispatch({type: 'setLoadingStatus' , value:'pending'})
        }
      
        if(order && !order.isPaid){
          if(!window.paypal){
            loadPayPalScript()
          }
        }
  
      }

  } , [ order , paypal , paypalDispatch , loadingPaypal , errorPayPal])

  // async function onApprovetest(){
    
  //   await payOrder({orderId , details : {payer :{}}})
  //   refetch();
  //   toast.success('Payment Successful')
  // }

  function onApprove (data , actions){
     return actions.order.capture().then(async function (details){
       
        try {
          await payOrder({orderId , details})
          refetch();
          toast.success('Payment Successful')
        } catch (err) {
          toast.error(err?.data?.message || err.message)
        }
     })
  }


  function createOrder(data , actions){
       
    return actions.order.create({
      purchase_units: [
        {
          amount : {
            value: order.totalPrice
          },
        },
      ],

    }).then((orderId)=>{
      return orderId;
    })
  }


  function onError(err){
    toast.error(err.message)
  }

  const deliverOrderHandler = async()=>{

       try {
        const test = await deliverOrder(orderId)
        console.log(test)
        refetch();
        toast.success('Order delivered successfuly')
       } catch (err) {
        toast.error(err?.data?.message || err.message )
       }

  }


  return isLoading ? (<Loader/>) : 
         isError ? (<Message variant='danger'/>) :
  (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name : </strong>{order.user.name}
              </p>
              <p>
                <strong>Email : </strong>{order.user.email}
              </p>
              <p>
                <strong>Address : </strong>{order.shippingAddress.address}
                {order.shippingAddress.city} ,{order.shippingAddress.postalCode} ,{order.shippingAddress.country}
              </p>
              { order.isDelivered ? (
                <Message variant="success">Delivered at {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item >
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong>{order.paymentMethod}
              </p>
             {order.isPaid ? (
      
                <Message variant="success">Paid on {order.paidAt}</Message>
             ) : (
              <Message variant="danger">Not paid</Message>

             )}
              
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
            
              { order.orderItems.map((item , index)=>(
                <ListGroup.Item key={index}>
                   <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>

                    <Col >
                       <Link to={ `/products/${item.product}`}>
                        {item.name}
                       </Link>
                      </Col>

                      <Col md={4}>
                       {item.qty} X ${item.price} = ${item.qty * item.price}
                      </Col>
                   </Row>
                 </ListGroup.Item> 
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
                </ListGroup.Item>
            <ListGroup.Item>   
              <Row>
                <Col>Items:</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
           
              <Row>
                <Col>Shipping:</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            

          
              <Row>
                <Col>Tax:</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            
              <Row>
                <Col>Total:</Col>
                <Col>${order.totalPrice}</Col>
              </Row>     

            { !order.isPaid && (
              <ListGroup.Item>
                { loadingPay && <Loader/>}

                { isPending ? <Loader/> : ( 
                  <div>
                    {/* <Button onClick={onApprovetest} style={{ marginBottom: '10px'}}>
                      Test Pay order
                    </Button> */}

                    <div>
                      <PayPalButtons 
                         createOrder={createOrder}
                         onApprove={onApprove}
                         onError={onError}
                         ></PayPalButtons>
                    </div>
                  </div>
                ) }
              </ListGroup.Item>

            ) }

          </ListGroup.Item>
          
          { loadingDeliver && <Loader/> }

            { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroup.Item>
                <Button type='button' className='btn btn=block' onClick={ deliverOrderHandler }>
                  Mark As Delivered
                </Button>
              </ListGroup.Item>


            ) }
 
         </ListGroup>
       </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen