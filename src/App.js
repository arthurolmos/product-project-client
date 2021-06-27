import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Products from './pages/Products'
import NewProduct from './pages/NewProduct'
import Teste from './components/Teste'
function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Products} />
        <Route path='/Products/New' exact component={NewProduct} />
        <Route path='/Teste' exact component={Teste} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
