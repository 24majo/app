import { Container, Button, Checkbox, Title, Text } from '@mantine/core'
import {Lateral} from '../components/navbar'
// import Redirection from '../components/redirections'
// import NotFound from '../components/notFound'
import { useNavigate } from 'react-router-dom'
import '../styles/Dashboard.css'

function Dashboard(){
    return(
        <div className='principal'>
            <Lateral />
            <div className='content'>
                
            </div>
        </div>
    );
}

export default Dashboard