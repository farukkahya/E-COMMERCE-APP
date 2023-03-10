import React from 'react'
import {useAuth} from '../../contexts/AuthContext'
import { Button } from '@chakra-ui/react'
function Profile() {
  const {user} = useAuth()
  return (
    <div className='product-container'>
      <h2>Profile</h2>
      <code>{JSON.stringify(user)}</code>
      <Button mt={5} w={"max-content"} colorScheme={"red"} id="logoutBtn">Logout</Button>
    </div>
  )
}

export default Profile