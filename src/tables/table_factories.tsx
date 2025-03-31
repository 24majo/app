import { useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { Center, Group, Table, Title, Text, TextInput, UnstyledButton, Button, Drawer, NumberInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles/content_table.module.css'
import { ModalDelete } from '../components/modal-delete';

interface RowData {
  name: string;
  description: string;
  add_line1: string;
  add_line2: string;
  add_line3: string;
  tel: number;
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
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
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
    name: 'Little - Rippin',
    description: 'Hershel Mosciski',
    add_line1: 'Dirección 1',
    add_line2: 'Dirección 2',
    add_line3: 'Dirección 3',
    tel: 5435435434
  },
  {
    name: 'Greenfelder - Krajcik',
    description: 'Hershel Mosciski',
    add_line1: 'Dirección 1',
    add_line2: 'Dirección 2',
    add_line3: 'Dirección 3',
    tel: 5435435434
  },
  {
    name: 'Kohler and Sons',
    description: 'Hershel Mosciski',
    add_line1: 'Dirección 1',
    add_line2: 'Dirección 2',
    add_line3: 'Dirección 3',
    tel: 5435435434
  },
  {
    name: 'Crona, Aufderhar and Senger',
    description: 'Hershel Mosciski',
    add_line1: 'Dirección 1',
    add_line2: 'Dirección 2',
    add_line3: 'Dirección 3',
    tel: 5435435434
  },
  {
    name: 'Gottlieb LLC',
    description: 'Hershel Mosciski',
    add_line1: 'Dirección 1',
    add_line2: 'Dirección 2',
    add_line3: 'Dirección 3',
    tel: 5435435434
  },
  {
    name: 'Funk, Rohan and Kreiger',
    description: 'Hershel Mosciski',
    add_line1: 'Dirección 1',
    add_line2: 'Dirección 2',
    add_line3: 'Dirección 3',
    tel: 5435435434
  },
];

export function Table_factory() {
  const [Delete, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [Edit, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState<RowData | null>(null);

  const handleDeleteClick = (row: RowData) => {
    setSelectedRowForDelete(row);
    openModal();
  };

  const deleteRow = () => {
    if (selectedRowForDelete) {
      setSortedData((prev) => prev.filter((item) => item.name !== selectedRowForDelete.name));
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
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.description}</Table.Td>
      <Table.Td>{row.add_line1}</Table.Td>
      <Table.Td>{row.add_line2}</Table.Td>
      <Table.Td>{row.add_line3}</Table.Td>
      <Table.Td>{row.tel}</Table.Td>
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
        className={classes.draw_edit}
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

            <Drawer.Body>
              <TextInput
                leftSectionPointerEvents="none"
                label ="Nombre"
                placeholder="Ingresa el nombre"
                name='name'
                required
                labelProps={{ style: { fontWeight: 'bold' } }}
                style={{padding: '2vh 0vh 3vh 0vh'}} 
                value={selectedRow?.name || ''}
              />

              <TextInput
                leftSectionPointerEvents="none"
                label ="Descripción"
                placeholder="Ingresa la descripción"
                name='description'
                required
                labelProps={{ style: { fontWeight: 'bold' } }}
                style={{padding: '0vh 0vh 3vh 0vh'}} 
                value={selectedRow?.description || ''}
              />

              <TextInput
                leftSectionPointerEvents="none"
                label ="AddressLine1"
                placeholder="AddressLine1"
                name='add_line1'
                required
                labelProps={{ style: { fontWeight: 'bold' } }}
                style={{padding: '0vh 0vh 3vh 0vh'}} 
                value={selectedRow?.add_line1 || ''}
              />

              <TextInput
                leftSectionPointerEvents="none"
                label ="AddressLine2"
                placeholder="AddressLine2"
                name='add_line2'
                required
                labelProps={{ style: { fontWeight: 'bold' } }}
                style={{padding: '0vh 0vh 3vh 0vh'}} 
                value={selectedRow?.add_line2 || ''}
              />

              <TextInput
                leftSectionPointerEvents="none"
                label ="AddressLine3"
                placeholder="AddressLine3"
                name='add_line3'
                required
                labelProps={{ style: { fontWeight: 'bold' } }}
                style={{padding: '0vh 0vh 3vh 0vh'}} 
                value={selectedRow?.add_line3 || ''}
              />

              <NumberInput 
                label="Teléfono" 
                placeholder="4774325436" 
                hideControls 
                withAsterisk
                labelProps={{ style: { fontWeight: 'bold' } }}
                maxLength={10}
                value={selectedRow?.tel || ''}
              />
            
              <div style={{ marginTop: '30%', display: 'flex', justifyContent: 'flex-end' }}>
                <Button>Aceptar</Button>
              </div>
            </Drawer.Body>

        </Drawer.Content>
      </Drawer.Root>
      
      <div className={classes.header}>
        <Title order={2}>Lista de Fábricas</Title>

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
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Nombre
            </Th>

            <Th
              sorted={sortBy === 'description'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('description')}
            >
              Descripción
            </Th>

            <Th
              sorted={sortBy === 'add_line1'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('add_line1')}
            >
              AddressLine1
            </Th>
            
            <Th
              sorted={sortBy === 'add_line2'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('add_line2')}
            >
              AddressLine2
            </Th>

            <Th
              sorted={sortBy === 'add_line3'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('add_line3')}
            >
              AddressLine3
            </Th>

            <Th
              sorted={sortBy === 'tel'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('tel')}
            >
              Teléfono
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