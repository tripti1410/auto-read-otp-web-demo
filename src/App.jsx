import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Button, Flex, Text, Input, HStack } from '@chakra-ui/react';
import './App.css'


function App() {
  const [validationCode, setValidationCode] = useState("");
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg]= useState("")
  useEffect(() => {
    if ('OTPCredential' in window) {
        const ac = new AbortController();
        navigator.credentials.get({
          otp: { transport:['sms'] },
          signal: ac.signal
        }).then(otp => {
          setValidationCode(otp.code);
          handleSubmit("Verification successfull")
        }).catch(err => {
          console.log(err);
          setError(err.message)
        });
      }
  });
  const handleSubmit = () => setSuccessMsg("***successfully set***")
  return (
    <>
       <ChakraProvider>
       <Flex flexDir='column' w='100%' pb={{ base: '4', sm: '8' }} px={{ base: '1', sm: '8' }}>
          <Flex flexDir='column' p={4} justifyContent='center' alignItems='center' pb={8} mb={8}>
          <Text my='6' fontSize="lg" fontWeight="600"> This is a demo website to auto read OTP from SMS in the mobile browser. </Text>
          <Text my='1' color='green'> Success msg: {successMsg}</Text>
            <Text my='6' color='red'>Error msg: {error}</Text>
            <Text my='1'>Enter OTP below</Text>
            <HStack>
              <Input
                autoFocus
                type='number'
                size='lg'
                autoComplete='one-time-code'
                letterSpacing={6}
                mb={4}
                value={validationCode}
                onChange={(e) => setValidationCode(e.target.value)}/>
            </HStack>
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
