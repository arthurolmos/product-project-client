import SideBarMenu from '../components/SideBarMenu'
import EditFormProduct from '../components/EditFormProduct'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
export default function EditProduct () {
  
  const [product, setProduct] = useState(null)
  const params = useParams()
  
  useEffect(() => {
    if (params.id !== undefined) { loadNote() }
  }, [])
  
  function loadNote () {
    // Make a request for a user with a given ID
    api.get(`/Products/${params.id}`)
      .then(function (response) {
        setProduct(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div>
      <SideBarMenu />
      <EditFormProduct product={product} />
    </div>
  )
}
