import { AppShell } from '@mantine/core'
import {Lateral} from '../components/navbar'
import '../styles/Dashboard.css'

function Dashboard(){
    return(
        <div className='principal'>
            <Lateral />
            <div className='content'>
                <AppShell>
                    <AppShell.Main>
                        Main
                    </AppShell.Main>
                </AppShell>
            </div>
        </div>
    );
}

export default Dashboard