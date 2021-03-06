import { useState } from "react"
import { Input, Button, Checkbox, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import useAuth from "../../hooks/useAuth"
import swal from "sweetalert"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons"

import AuthContainer from "@components/AuthContainer"

export default function Signup() {
  const router = useRouter()

  const [signUpData, setSignUpData] = useState({})
  const { registerUser } = useAuth()

  const handleOnBlur = (e) => {
    const field = e.target.name
    const value = e.target.value
    const newSignUpData = { ...signUpData }
    newSignUpData[field] = value
    setSignUpData(newSignUpData)
  }

  const handleSignUpSubmit = (e) => {
    e.preventDefault()
    if (signUpData.password !== signUpData.confirmPassword) {
      swal(
        "Passwords doesn't match!",
        "Please check password and then try again",
        "error"
      )
    } else {
      registerUser(
        signUpData.firstName,
        signUpData.lastName,
        signUpData.email,
        signUpData.address,
        signUpData.password,
        router
      )
      e.target.reset()
    }
  }

  return (
    <AuthContainer handleSubmit={handleSignUpSubmit}>
      <h4 style={{ color: "#000" }}>Sign Up</h4>
      <Input
        type='text'
        placeholder='First Name'
        name='firstName'
        onBlur={handleOnBlur}
        bg='white'
        required
      />
      <Input
        type='text'
        placeholder='Last Name'
        name='lastName'
        onBlur={handleOnBlur}
        bg='white'
        required
      />
      <Input
        type='email'
        placeholder='Email'
        name='email'
        onBlur={handleOnBlur}
        bg='white'
        required
      />
      <Input
        type='text'
        placeholder='Address'
        name='address'
        onBlur={handleOnBlur}
        bg='white'
        required
      />
      <Input
        type='password'
        name='password'
        placeholder='Password'
        onBlur={handleOnBlur}
        bg='white'
        required
      />
      <Input
        type='password'
        name='confirmPassword'
        placeholder='Confirm Password'
        onBlur={handleOnBlur}
        bg='white'
        required
      />
      <Checkbox colorScheme='green' color='#000' required>
        I agree to the Terms and Conditions
      </Checkbox>

      <Button type='submit' colorScheme='green'>
        Sign Up
        <FontAwesomeIcon icon={faUserPlus} style={{ marginLeft: "4px" }} />
      </Button>
      <Text color='#000'>Have an Account?</Text>

      <Button
        colorScheme='green'
        variant='outline'
        onClick={() => router.push("/login")}
      >
        Login
        <FontAwesomeIcon icon={faSignInAlt} style={{ marginLeft: "4px" }} />
      </Button>
    </AuthContainer>
  )
}
