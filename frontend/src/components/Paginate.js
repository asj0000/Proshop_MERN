import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const Paginate = ( { totalpages , currentpage , isAdmin=false , keyword= ''}) => {
  return (
   
    totalpages > 1 && (
      <Pagination>
       
        {/* here page indexing will start from zero so we have set x + 1 */}
       
        { [...Array(totalpages).keys().map((x) => (
           <LinkContainer 
           key={ x + 1}
           
           to={ 
            !isAdmin ? keyword ?  `/search/${keyword}/page/${x + 1}` :  `/page/${x + 1}` :  `/admin/productlist/${x + 1}`
           }
          >
          <Pagination.Item active={ x + 1 === currentpage}>{ x + 1 }</Pagination.Item>
           </LinkContainer>
        ))] }
      </Pagination>
    )
  )
}

export default Paginate