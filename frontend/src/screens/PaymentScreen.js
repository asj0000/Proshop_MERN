import {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form , Button , Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer.js'
// import CheckOutSteps from '../components/CheckoutSteps.js'
import { useDispatch , useSelector} from 'react-redux'
import { setPaymentMethod } from '../slices/cartSlice.js'

const PaymentScreen = () => {
 
  const [paymentMethod , setMethod] = useState('PayPal') 

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  //TO check if there is any shipping address in local storage
  useEffect(()=>{

    if(!shippingAddress){
      navigate('/shipping')
    }
  } ,[shippingAddress , navigate])

  const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(setPaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      {/* <CheckOutSteps step1 step2 step3 /> */}
      
      <h1>Payment Screen</h1>
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label as='legend'>Select Method</Form.Label>
        <Col>
          <Form.Check
             type='radio'
             className='my-2'
             label='PayPal or Credit Card'
             id='Paypal'
             name='paymentMethod'
             value='PayPal'
             checked
             onChange={(e)=> setMethod(e.target.value)}
             ></Form.Check>
        </Col>
      </Form.Group>

      <Button type='submit' variant='primary'>
        Continue
      </Button>
    </Form>
      
    </FormContainer>
  )
}

export default PaymentScreen