import { Container, Button, Checkbox, Title, Text } from '@mantine/core'
import { TextInput, PasswordInput, Image } from '@mantine/core'
import { IconLock } from '@tabler/icons-react'
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { Lateral } from '../components/navbar'

function Employ(){
    <BrowserRouter>
        <div style={{ display: 'flex' }}>
            {/* <Lateral /> */}
            
            <Container style={{ marginLeft: '250px' }}> 
                <Title>Employees</Title>
                <Text>This is the employees page.</Text>
            </Container>
        </div>
    </BrowserRouter>

    return(
        <Text>Employees</Text>
    )
    
}

export default Employ;