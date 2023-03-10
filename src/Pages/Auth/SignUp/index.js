import React, { useEffect, useState } from 'react'
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from "@chakra-ui/react"
import { useFormik } from 'formik'
import validationSchema from './validations'
import { fetchRegister } from '../../../api'
import { v4 as uuidv4 } from 'uuid';
import '../style.css'
import { useAuth } from '../../../contexts/AuthContext'

function SignUp() {
  let emails = []
  const { register, user } = useAuth();
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_ENDPOINT}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []); 
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        users.map((user) => emails.push(user.email));
        console.log(emails)
        const registerResponse = await emails.includes(values.email) ? bag.setErrors({ emailFound: "This e-mail is used." }) :  fetchRegister({ id: uuidv4(), name: values.name, email: values.email, password: values.password, role: "user" });
        register(registerResponse)
        console.log(registerResponse)
      }
      catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    }
  })
  return (
    <div className='container'>
      <Flex align='cemter' justifyContent='center'>
        <Box className='box' p={10}>
          <div>
            <Box textAlign={'center'}>
              <Heading>Sign Up</Heading>
            </Box>
            <Box>
              {formik.errors.emailFound && (<Alert mt={5} status='error'>{formik.errors.emailFound}</Alert>)}
            </Box>
            <Box>
              {user && (<Alert mt={5} borderRadius={'3px'} status='success'>Register is success!</Alert>)}
            </Box>
            <Box textAlign={'left'} my={5}>
              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <FormLabel>Ad Soyad</FormLabel>
                  <Input name='name' type={'text'} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} isInvalid={formik.touched.name && formik.errors.nanme} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>E-Mail</FormLabel>
                  <Input name='email' type={'email'} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} isInvalid={formik.touched.email && formik.errors.email} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input name='password' type={'password'} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} isInvalid={formik.touched.password && formik.errors.password} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Password Confirm</FormLabel>
                  <Input name='passwordConfirm' type={'password'} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm} isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm} />
                </FormControl>

                <Button mt={4} width='full' type='submit' colorScheme={'orange'}>Sign Up</Button>
              </form>
            </Box>
          </div>
        </Box>
      </Flex>
    </div>
  )
}

export default SignUp