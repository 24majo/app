import { useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { Center, Group, keys, Table, Title, Text, TextInput, UnstyledButton, Button, Drawer, Select, PasswordInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../styles/content_table.module.css'
import { ModalDelete } from '../modals/modal-delete';
import { IconLock, IconEyeCheck, IconEyeOff } from '@tabler/icons-react'

interface RowData {
  name: string;
  email: string;
  user: string;
  rol: string;
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
    <Table.Th>
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
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
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
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

const data = [
  {
    name: 'Athena Weissnat',
    user: 'Little - Rippin',
    email: 'Elouise.Prohaska@yahoo.com',
    rol: 'Administrador'
  },
  {
    name: 'Deangelo Runolfsson',
    user: 'Greenfelder - Krajcik',
    email: 'Kadin_Trantow87@yahoo.com',
    rol: 'Administrador'
  },
  {
    name: 'Danny Carter',
    user: 'Kohler and Sons',
    email: 'Marina3@hotmail.com',
    rol: 'Administrador'
  },
  {
    name: 'Trace Tremblay PhD',
    user: 'Crona, Aufderhar and Senger',
    email: 'Antonina.Pouros@yahoo.com',
    rol: 'Usuario'
  },
  {
    name: 'Derek Dibbert',
    user: 'Gottlieb LLC',
    email: 'Abagail29@hotmail.com',
    rol: 'Usuario'
  },
  {
    name: 'Viola Bernhard',
    user: 'Funk, Rohan and Kreiger',
    email: 'Jamie23@hotmail.com',
    rol: 'Administrador'
  },
];

export function Table_user() {
  const [Delete, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [Edit, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [formData, setFormData] = useState<RowData>({ name: '', user: '', email: '', rol: '' });
  const [selectedRowForDelete, setSelectedRowForDelete] = useState<RowData | null>(null);

  const handleDeleteClick = (row: RowData) => {
    setSelectedRowForDelete(row);
    openModal();
  };

  const deleteRow = () => {
    if (selectedRowForDelete) {
      setSortedData((prev) => prev.filter((item) => item.email !== selectedRowForDelete.email));
    }
    closeModal();
  };

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

  const handleSave = () => {
    if (selectedRow) {
      setSortedData(prevData => prevData.map(user => user.email === selectedRow.email ? formData : user));
    } else {
      setSortedData(prevData => [...prevData, formData]);
    }
    closeDrawer();
  };

  const handleAddClick = () => {
    setSelectedRow(null);
    setFormData({ name: '', user: '', email: '', rol: '' });
    openDrawer();
  };

  const handleEditClick = (row: RowData) => {
    setSelectedRow(row);
    setFormData(row);
    openDrawer();
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.user}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.rol}</Table.Td>
      <Table.Td className={classes.actions}>
        <IconEdit size={20} color="gray" onClick={() => handleEditClick(row)} style={{marginRight: 7}}/>
        <IconTrash size={20} color="gray" onClick={() => handleDeleteClick(row)} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className={classes.main}>
      <ModalDelete opened={Delete} onClose={closeModal} onConfirm={deleteRow} />

      <Drawer.Root opened={Edit} onClose={closeDrawer} position="right">
        <Drawer.Overlay />
        <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title style={{ fontWeight: 'bold', fontSize: '20px' }}>{selectedRow ? 'Editar' : 'Agregar'}</Drawer.Title>
              <Drawer.CloseButton />
            </Drawer.Header>

            <Drawer.Body>
              <TextInput
                label="Nombre Completo"
                placeholder="Ingresa tu nombre con apellidos"
                name="name"
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                required
                labelProps={{ style: { fontWeight: 'bold' } }}
                style={{ padding: '2vh 0vh 3vh 0vh' }} 
              />

              <TextInput
                label="Nombre de Usuario"
                placeholder="Ingresa tu usuario"
                name="user"
                value={formData.user} 
                onChange={e => setFormData({ ...formData, user: e.target.value })} 
                required
                labelProps={{ style: { fontWeight: 'bold' } }}
                style={{ padding: '0vh 0vh 3vh 0vh' }} 
              />

              <Select
                label="Rol"
                value={formData.rol} 
                placeholder='Elige el tipo de rol'
                onChange={(value) => setFormData({ ...formData, rol: value ?? '' })}
                data={['Administrador', 'Usuario']}
                name="rol"
                withAsterisk
                labelProps={{ style: { fontWeight: 'bold' } }}
                style={{ padding: '0vh 0vh 3vh 0vh' }} 
              />

              <TextInput
                label="Correo"
                placeholder="nombre@dominio.com"
                name="email"
                value={formData.email} 
                onChange={e => setFormData({ ...formData, email: e.target.value })} 
                required
                labelProps={{ style: { fontWeight: 'bold' } }}
                style={{ padding: '0vh 0vh 3vh 0vh' }} 
              />

              <PasswordInput
                mx="auto"
                label="Contraseña"
                placeholder="Contraseña"
                name="pass"
                leftSection={<IconLock />}
                visibilityToggleIcon={VisibilityToggleIcon}
                required
                labelProps={{ style: { fontWeight: 'bold' } }}
              />
            
              <div style={{ marginTop: '50%', display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleSave}>Aceptar</Button>
              </div>
            </Drawer.Body>

        </Drawer.Content>
      </Drawer.Root>

      <div className={classes.header}>
        <Title order={2}>Lista de Usuarios</Title>
        <Button variant="light" onClick={handleAddClick}><IconPlus /> Agregar</Button>
      </div>

      <div className={classes.search}>
        <TextInput 
          placeholder="Buscar..." 
          leftSection={<IconSearch />} 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          style={{ width: '93%' }} 
        />

        <Button> <IconSearch/> </Button>
      </div>
    
      <Table>
        <Table.Tbody>
          <Table.Tr style={{ fontWeight: 'bold' }}>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Nombre
            </Th>

            <Th
              sorted={sortBy === 'user'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('user')}
            >
              Nombre de Usuario
            </Th>

            <Th
              sorted={sortBy === 'email'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('email')}
            >
              Correo electrónico
            </Th>
            
            <Th
              sorted={sortBy === 'rol'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('rol')}
            >
              Rol
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