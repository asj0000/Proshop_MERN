import {Row , Col} from 'react-bootstrap'
import { useParams  } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect , useState } from 'react'
import Product from '../components/ProductCard.js'
import Loader from '../components/Loader.js'
import Paginate from '../components/Paginate.js'
import { useGetProductsQuery } from '../slices/productsApiSlice.js'
import Message from '../components/Message.js'

const HomeScreen = () => {
   
  const { pageNumber } = useParams()

  //  const [products , setProducts] = useState([])

  //  useEffect(()=>{
  //       const fetchProducts =  async ()=>{
          
  //         try{
  //           const {data} =  await axios.get('/api/products')
          
  //           //const actualProductsArray = data.products; 
  //           setProducts(data)

          
   
  //       }catch(error){
  //         console.log(error)
  //       }
  //    }
 

  //       fetchProducts()
  //  },[]  )

  const { data, isLoading , error} = useGetProductsQuery({ pageNumber })
 

  return (
   <>
   <h1>Latest Products</h1>

   {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>error.data.message || error.error</Message>) : (<>
        
          <Row>
          
            
          { data.allProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
          }

      </Row>
      <Paginate totalpages={data.pages} currentpage={data.page}/>

   </>)}
   
  
   
   </>
  )
}

export default HomeScreen