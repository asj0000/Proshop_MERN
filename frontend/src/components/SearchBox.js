import { useState} from 'react'
import { useNavigate , useParams} from 'react-router-dom'
import { Form , Button  } from 'react-bootstrap'

const SearchBox = () => {

  const { keyword: urlKeyword } = useParams()
 
  const [ keyword , setKeyword] = useState(urlKeyword || '')

  const navigate = useNavigate()

  const handleSubmit = (e)=>{

    e.preventDefault()

    if(keyword.trim()){
      setKeyword('')
      navigate( `/search/${keyword}`)
    } else{
      navigate('/')
    }
    
   

  }

  return (
    <Form  onSubmit={ handleSubmit } className='d-flex'>
      <Form.Control
         type='text'
         name='q'
         value={keyword}
         placeholder='Search Products...'
         onChange={ (e)=> setKeyword(e.target.value)}
         className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-light' className='p-2 max-2'>Search</Button>
    </Form>
  )
}

export default SearchBox