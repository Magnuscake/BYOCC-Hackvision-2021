import { useRouter } from "next/router"
import { useState } from "react"
import { Input, Button, HStack, Link, Text } from "@chakra-ui/react"
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa"

import useAuth from "@hooks/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons"

import AuthContainer from "@components/AuthContainer"

export default function Login() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({})
  const {
    user,
    loginUser,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
  } = useAuth()

  const handleOnBlur = (e) => {
    const field = e.target.name
    const value = e.target.value
    const newLoginData = { ...loginData }
    newLoginData[field] = value
    setLoginData(newLoginData)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    loginUser(loginData.email, loginData.password, router)
  }

  return (
    <AuthContainer handleSubmit={handleLoginSubmit}>
      <Text color='#000'>Please Login To Continue</Text>
      <Input
        type='email'
        placeholder='Email'
        name='email'
        onBlur={handleOnBlur}
        bg='white'
      />
      <Input
        type='password'
        name='password'
        placeholder='Password'
        onBlur={handleOnBlur}
        bg='white'
      />
      <Button type='submit' colorScheme='green'>
        Login{" "}
        <FontAwesomeIcon icon={faSignInAlt} style={{ marginLeft: "4px" }} />
      </Button>
      <Link color='green'>Forgot Password?</Link>

      <p className='divider-text'>
        <span
          style={{
            backgroundColor: "white",

            borderRadius: "50%",
            padding: "6px",
            color: "#000",
          }}
        >
          OR
        </span>
      </p>

      <HStack
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => signInWithFacebook(router)}
          colorScheme='facebook'
          leftIcon={<FaFacebook />}
        >
          Facebook
        </Button>
        <Button
          onClick={() => signInWithGoogle(router)}
          colorScheme='red'
          leftIcon={<FaGoogle />}
        >
          Google
        </Button>
        {/* <Button onClick={() => signInWithTwitter(router)} colorScheme="twitter" leftIcon={<FaTwitter />}>
                Twitter
              </Button> */}
      </HStack>

      <label>New User?</label>
      <Button
        colorScheme='green'
        variant='outline'
        onClick={() => router.push("/signup")}
      >
        Create an Account
        <FontAwesomeIcon icon={faUserPlus} style={{ marginLeft: "20px" }} />
      </Button>
    </AuthContainer>
  )
}
