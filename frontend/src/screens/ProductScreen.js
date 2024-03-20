import { useState   } from "react"
// import axios from 'axios'
import { useParams } from "react-router-dom"
// import products from "../products"
import { addToCart } from "../slices/cartSlice.js"
import { Form , Row , Col , Image , ListGroup , Card ,Button, ListGroupItem } 
from 'react-bootstrap'
import { Link , useNavigate } from "react-router-dom"
import Loader from "../components/Loader.js"
import Rating from "../components/Rating"
import { useGetProductQuery } from '../slices/productsApiSlice'
import { useDispatch } from "react-redux"
import Message from "../components/Message.js"

const ProductScreen = () => {

//   const [product , setProducts] = useState({})

  const {id: productId } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

//   useEffect(()=>{
//     const fetchProducts =  async ()=>{
      
//       try{
//         const {data} =  await axios.get(  `/api/products/${productId}  `)
      
//         // const actualProductsArray = data; 
//         setProducts(data)
//     }catch(error){
//       console.log(error)
//     }
//  }


//     fetchProducts()
// },[productId]  )

  // const product = products.find((p)=>(p._id === productId))
  const [qty , setQty] = useState(1);

  const { data : product , isLoading , error } = useGetProductQuery(productId)

 const addToCartHandler = () =>{
        dispatch(addToCart({ ...product , qty}))
        navigate('/cart')
 }

 
  return (
    <>
    <Link className="btn btn-light my-3" to="/">
      Go Back
    </Link>
   
   { isLoading ? (<Loader/>) : error ?(<Message variant='danger'>error.data.message || error.error</Message>) : (
    <>
   
   <Row>

   <Col md={5}>
    <Image src={product.image} alt={product.name} fluid/>
   </Col>
   <Col md={4}>
      <ListGroup variant='flush'>
       <ListGroupItem>
         <h3>{product.name}</h3>
       </ListGroupItem>
      
       <ListGroupItem>
         <Rating value={product.rating} text={ `${product.numReviews}`}/>
       </ListGroupItem>
     
       <ListGroupItem>
         Price: ${product.price}
       </ListGroupItem>

       <ListGroupItem>
         Description: {product.description}
       </ListGroupItem>

      </ListGroup>
   </Col>
   <Col md={3}>
     <Card>
       <ListGroup variant="flush">
         <ListGroupItem>
           <Row>
             <Col>
              Price:
             </Col>
             <Col>
              <strong>${product.price}</strong>
             </Col>
           </Row>
         </ListGroupItem>
         <ListGroupItem>
           <Row>
             <Col>
              Status:
             </Col>
             <Col>
              <strong>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
             </Col>
           </Row>
         </ListGroupItem>

         {product.countInStock > 0 && (
          <ListGroup.Item>
            <Row>
              <Col>
                 Qty
              </Col>

              <Col>
               <Form.Control
                 as ='select'
                 value={qty}
                 onChange={(e) => setQty(Number(e.target.value))}
               >
               {[...Array(product.countInStock).keys().map((x) =>(
                <option key={x + 1} value={x + 1}>
                  { x + 1}
                </option>
               ) )]}
               </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
         )}

         <ListGroupItem>
        
             <Button 
              className="btn-button"
               type="button"
               disabled={product.countInStock === 0}
               onClick={addToCartHandler}
             >Add to Cart</Button>
           
         </ListGroupItem>
       </ListGroup>
     </Card>
   
   </Col>

 </Row>

    
   </>)}

    
    </>
  )
}

export default ProductScreen