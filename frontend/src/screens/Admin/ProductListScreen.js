import { LinkContainer } from "react-router-bootstrap"
import { Table , Button , Row  , Col} from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useGetProductsQuery , useCreateProductMutation ,useDeleteProductMutation } from "../../slices/productsApiSlice.js"
import Loader from "../../components/Loader.js"
import Message from "../../components/Message.js"
import Paginate from "../../components/Paginate.js"
import {  FaEdit , FaTrash } from "react-icons/fa"
import { toast } from 'react-toastify'


const ProductListScreen = () => {

  const { pageNumber } = useParams()

  const  { data , isLoading , isError , refetch  } = useGetProductsQuery({pageNumber})

  const [ deleteProduct , { isLoading: loadingDelete}] = useDeleteProductMutation()

  
  const deleteHandler  = async(id)=>{
    
   if(window.confirm('Are you sure ? ')) {
  
    try {
      await deleteProduct(id)
      toast.success('Product Deleted')
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
   }
   

  }
  
  const  [ createProduct , { isLoading : loadingCreate}] = useCreateProductMutation()

  const createProductHandler = async()=>{
   
    if ( window.confirm){
      
      try {
         
        await createProduct()
        refetch()

      } catch (err) {
       
        toast.error(err?.data?.message || err.error)
      }
    }

  }

  return (
    <>
    <Row className="align-items-center">
     <Col >
       <h2>Products</h2>
     </Col>
     <Col className="text-end">
      <Button className="btn-sm m-3" onClick={ createProductHandler }>
        <FaEdit/>Create Product
      </Button>
     </Col>
    </Row>

    { loadingCreate && <Loader/> }
    { loadingDelete && <Loader/> }

    { isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{isError}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              
              { data.allProducts.map( ( product )=>(
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={ `/admin/products/${product._id}/edit`}>
                         <Button variant="light"  className="btn-sm  mx-2">
                           <FaEdit/>
                         </Button>
                      </LinkContainer>
 
                        <Button variant='danger' onClick={ ()=> deleteHandler(product._id) }>
                           <FaTrash  style={{color: 'white'}}/>
                         </Button>

                    </td>

                  </tr>
              ))}

            </tbody>
            </Table>
            <Paginate totalpages={data.pages}  currentpage={data.page} isAdmin={true}/>
        </>
    
        
        )
      }
   </>
  )}

export default ProductListScreen