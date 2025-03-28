import { AppShell } from '@mantine/core'
import {Lateral} from '../components/navbar'
import { Table_factory } from '../tables/table_factories'

export function Factories(){
    return(
        <div className='principal'>
            <Lateral />
            <div className='content'>
                <AppShell>
                    <AppShell.Main>
                        <Table_factory/>
                    </AppShell.Main>
                </AppShell>
            </div>
        </div>
    )
}