import { useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { Center, Group, Table, Title, Text, TextInput, UnstyledButton, Button, Drawer, NativeSelect, NumberInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles/content_table.module.css'
import { ModalDelete } from '../components/modal-delete';

interface RowData {
  status: string;
  name: string;
  office: number;
  access: number;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th style={{textAlign: 'center'}}>
      <UnstyledButton onClick={onSort}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        Object.keys(item).some((key) => {
            const value = item[key as keyof RowData];
            if (typeof value === 'string') {
                return value.toLowerCase().includes(query);
            }
            return false; 
        })
    );
  }
  

  function sortData(
    data: RowData[],
    payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
  ) {
    const { sortBy } = payload;
  
    if (!sortBy) {
        return filterData(data, payload.search);
    }
  
    return filterData(
        [...data].sort((a, b) => {
            const aValue = a[sortBy];
            const bValue = b[sortBy];
    
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return payload.reversed ? bValue - aValue : aValue - bValue;
            }
    
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                if (payload.reversed) {
                    return bValue.localeCompare(aValue);
                }
            return aValue.localeCompare(bValue);
            }
    
            return 0; 
        }),
        payload.search
    );
}  

const data = [
  {
    status: 'Activo',
    name: 'Little - Rippin',
    office: 1,
    access: 2
  },
  {
    status: 'Activo',
    name: 'Greenfelder - Krajcik',
    office: 1,
    access: 2
  },
  {
    status: 'Desactivado',
    name: 'Kohler and Sons',
    office: 6,
    access: 3
  },
  {
    status: 'Desactivado',
    name: 'Crona, Aufderhar and Senger',
    office: 5,
    access: 1
  },
  {
    status: 'Activo',
    name: 'Gottlieb LLC',
    office: 3,
    access: 6
  },
  {
    status: 'Activado',
    name: 'Funk, Rohan and Kreiger',
    office: 4,
    access: 3
  },
];

export function Table_employ() {
  const [Delete, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [Edit, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [value, setValue] = useState('');
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState<RowData | null>(null);
  
    const handleDeleteClick = (row: RowData) => {
      setSelectedRowForDelete(row);
      openModal();
    };
  
    const deleteRow = () => {
      if (selectedRowForDelete) {
        setSortedData((prev) => prev.filter((item) => item.status !== selectedRowForDelete.status));
      }
      closeModal();
    };

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const handleEditClick = (row: RowData) => {
    setSelectedRow(row);  
    openDrawer(); 
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.status}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td style={{textAlign: 'center'}}>{row.office}</Table.Td>
      <Table.Td style={{textAlign: 'center'}}>{row.access}</Table.Td>
      <Table.Td className={classes.actions}>
        <IconEdit size={20} color="gray" onClick={() => handleEditClick(row)} style={{marginRight: 7}}/>
        <IconTrash size={20} color="gray" onClick={() => handleDeleteClick(row)} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.main}>
      <ModalDelete opened={Delete} onClose={closeModal} onConfirm={deleteRow} />

      <Drawer.Root
        position="right"
        opened={Edit}
        onClose={closeDrawer}
      >
        <Drawer.Overlay />
        <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Editar</Drawer.Title>
              <Drawer.CloseButton />
            </Drawer.Header>

            <Drawer.Body style={{ flexDirection: 'column', paddingBottom: '20px' }}>
              <TextInput
                leftSectionPointerEvents="none"
                label ="Nombre Completo"
                placeholder="Ingresa tu nombre con apellidos"
                name='name'
                required
                style={{padding: '2vh 0vh 3vh 0vh'}} // Arriba - Izquierda - Abajo - Derecha
                labelProps={{ style: { fontWeight: 'bold' } }}
                value={selectedRow?.name || ''}
              />

              <NumberInput
                label ="Oficina"
                placeholder="Ingresa oficina"
                name='office'
                required
                style={{padding: '0vh 0vh 3vh 0vh'}} 
                labelProps={{ style: { fontWeight: 'bold' } }}
                value={selectedRow?.office || ''}
              />

              <NumberInput 
                label="Accesos" 
                placeholder="0123" 
                name='access'
                hideControls 
                withAsterisk
                style={{padding: '0vh 0vh 3vh 0vh'}} 
                labelProps={{ style: { fontWeight: 'bold' } }}
                value={selectedRow?.access || ''}
              />

              <NativeSelect
                label="Estatus"
                // value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                data={['Activo', 'Desactivado']}
                name='status'
                withAsterisk
                labelProps={{ style: { fontWeight: 'bold' } }}
                value={selectedRow?.status || ''}
              />

              <div style={{ marginTop: '70%', display: 'flex', justifyContent: 'flex-end' }}>
                <Button>Aceptar</Button>
              </div>
            </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      
      <div className={classes.header}>
        <Title order={2}>Lista de Empleados</Title>

        <Button variant="light">
          <IconPlus/>
          Agregar
        </Button>
      </div>

      <div className={classes.search}>
          <TextInput
            placeholder="Search by any field"
            mb="md"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
            style={{
              width: '93%'
            }}
          />
          <Button> <IconSearch/> </Button>
      </div>
      
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === 'status'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('status')}
            >
              Estatus
            </Th>

            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Nombre
            </Th>

            <Th
              sorted={sortBy === 'office'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('office')}
            >
              Oficina
            </Th>
            
            <Th
              sorted={sortBy === 'access'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('access')}
            >
              Accesos
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  No hay registros
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </div>
  );
}