import SideBarMenu from '../components/SideBarMenu'
import Album from '../components/Album.jsx'
import api from '../services/api'
import { useEffect, useState } from 'react'

export default function Products () {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getAllProducts()
  }, [])

  function getAllProducts () {
    api.get('/Products')
      .then(function (response) {
        // handle success
        setProducts(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  return (
    <div>
      <SideBarMenu />
      <Album products={products} />
    </div>
  )
}
