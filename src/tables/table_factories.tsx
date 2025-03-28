import { useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import {
  Center,
  Group,
  Table,
  Title,
  Text,
  TextInput,
  UnstyledButton,
  Button,
  Drawer,
  Modal,
  NativeSelect,
  PasswordInput
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles/content_table.module.css'
import { IconLock, IconEyeCheck, IconEyeOff } from '@tabler/icons-react'

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
  const [value, setValue] = useState('');
  const icon = <IconLock size={18} stroke={1.5} />;

  const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? (
      <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    ) : (
      <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    );

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

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.description}</Table.Td>
      <Table.Td>{row.add_line1}</Table.Td>
      <Table.Td>{row.add_line2}</Table.Td>
      <Table.Td>{row.add_line3}</Table.Td>
      <Table.Td>{row.tel}</Table.Td>
      <Table.Td>
        <IconEdit size={20} color="gray" onClick={openDrawer} style={{marginRight: 7}}/>
        <IconTrash size={20} color="gray" onClick={openModal}/>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.main}>
      <Modal 
        opened={Delete} 
        onClose={closeModal} 
        title="Eliminar"
        centered
      >
        <Text
          style=
          {{
            marginBottom: 20  
          }}
        >¿Está seguro que quiere eliminar esto?
        </Text>

        <Button
          color='red'
          fullWidth
          style={{
            marginBottom: 5
          }}
        >
          Aceptar
        </Button>

        <Button
          variant='transparent'
          color='gray'
          fullWidth
        >
          Cancelar
        </Button>
      </Modal>

      <Drawer.Root
        className={classes.draw_edit}
        position="right"
        opened={Edit}
        onClose={closeDrawer}
        // title="Editar"
        // overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
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
                label ="Nombre Completo"
                placeholder="Ingresa tu nombre con apellidos"
                name='name'
                required
                style={{padding: '5vh 5vh 5vh 3vh'}}
                labelProps={{ style: { fontWeight: 'bold' } }}
              />

              <TextInput
                leftSectionPointerEvents="none"
                label ="Nombre de Usuario"
                placeholder="Ingresa tu usuario"
                name='user'
                required
                style={{padding: '5vh 5vh 5vh 3vh'}}
                labelProps={{ style: { fontWeight: 'bold' } }}
              />

              <NativeSelect
                label="Rol"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                data={['Administrador', 'Usuario']}
                name='rol'
                withAsterisk
              />

              <TextInput
                leftSectionPointerEvents="none"
                label ="Correo"
                placeholder="nombre@dominio.com"
                name='mail'
                required
                style={{padding: '5vh 5vh 5vh 3vh'}}
                labelProps={{ style: { fontWeight: 'bold' } }}
              />

              <PasswordInput
                mx="auto"
                label="Contraseña"
                placeholder="Contraseña"
                defaultValue=""
                name='pass'
                leftSection={icon}
                visibilityToggleIcon={VisibilityToggleIcon}
                required
                style={{padding:'0vh 5vh 5vh 3vh'}}
                labelProps={{ style: { fontWeight: 'bold' } }}
              />
            
              <Button>Aceptar</Button>
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
      
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
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