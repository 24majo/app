import { Container, Button, Checkbox, Title, Text, AppShell } from '@mantine/core'
import {Lateral} from '../components/navbar'
import { TableContent } from '../components/content_table';
import '../styles/Dashboard.css'

function Dashboard(){
    return(
        <div className='principal'>
            <Lateral />
            <div className='content'>
                <AppShell>
                    <AppShell.Main>
                        <TableContent/>
                    </AppShell.Main>
                </AppShell>
            </div>
        </div>
    );
}

export default Dashboard