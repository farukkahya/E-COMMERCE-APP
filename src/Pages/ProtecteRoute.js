import { Route, redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtecteRoute({ component: Component, ...rest }) {
  const { loggedIn } = useAuth()
  return (
    <Route {...rest} render={(props) => {
      if (loggedIn) {
        return <Component {...props} />
      }
      return redirect("/signup")
    }} />
  )
}

export default ProtecteRoute