import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Button, Flex, Text, HStack, PinInput, PinInputField } from '@chakra-ui/react';
import './App.css'

function App() {
  const [validationCode, setValidationCode] = useState("");
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg]= useState("")
  useEffect(() => {
    let ac = new AbortController();
    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: ac.signal
      })
      .then(otp => {
        setValidationCode(otp.code);
        handleSubmit(otp.code)
      })
      .catch(err => {
        console.log(err);
        setError(err)
      });
  });
  const handleSubmit = (otp) => setSuccessMsg("***successfully set***", otp)
  

  return (
    <>
       <ChakraProvider>
       <Flex flexDir='column' w='100%' pb={{ base: '4', sm: '8' }} px={{ base: '1', sm: '8' }}>
          <Flex flexDir='column' p={4} justifyContent='center' alignItems='center' pb={8} mb={8}>
          {/* <Text my='6'> This is a demo website to read the OTP in the mobile web. </Text> */}
          <Text my='6'> Success msg appear here: {successMsg}</Text>
            <Text my='3'>{`Error. ${error}`}</Text>
            <Text my='6'>{`validationCode. ${validationCode}`}</Text>
            <HStack>
              <PinInput value={validationCode} placeholder='' onChange={(e) => { setValidationCode(e) }} otp autoFocus>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <Flex mb='6'>
              <Text as='h3'>I didn&apos;t receive a code,&nbsp;</Text>
              <Button variant='link' colorScheme='brand'>resend code</Button>
            </Flex>
            <Button colorScheme='blue' color='white' mt='6' w='100%' borderRadius='4px' onClick={() => handleSubmit()}>
              VERIFY
            </Button>
          </Flex>
        </Flex>
        </ChakraProvider>
    </>
  )
}

export default App
