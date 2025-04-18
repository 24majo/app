import { AppShell } from '@mantine/core'
import {Lateral} from '../components/navbar'
import '../styles/Dashboard.css'
import { Table_employ } from '../tables/table_employees';

export function Employ(){
    return(
        <div className='principal'>
            <Lateral />
            <div className='content'>
                <AppShell>
                    <AppShell.Main>
                        <Table_employ/>
                    </AppShell.Main>
                </AppShell>
            </div>
        </div>
    );
}