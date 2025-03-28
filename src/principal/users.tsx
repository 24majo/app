import { AppShell } from '@mantine/core'
import {Lateral} from '../components/navbar'
import { Table_user } from '../tables/table_users'

export function Users(){
    return(
        <div className='principal'>
            <Lateral />
            <div className='content'>
                <AppShell>
                    <AppShell.Main>
                        <Table_user/>
                    </AppShell.Main>
                </AppShell>
            </div>
        </div>
    )
}