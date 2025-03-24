import React, { useState } from 'react';
import cx from 'clsx';
import { MantineProvider, Container, createTheme, Button } from '@mantine/core';
import classes from './styles/Demo.module.css';
import { TextInput, PasswordInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
import './App.css';

function App() {
  const icon = <IconAt size={16} />
  const theme = createTheme({
    components: {
      Container: Container.extend({
        classNames: (_, { size }) => ({
          root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
        }),
      }),
    },
  });

  const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? (
      <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    ) : (
      <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    );

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  
  const Cancelar = () => {
    setEmail('');
    setPass('');
  };

  return (
    <MantineProvider theme={theme}>
      <Container size="responsive" bg="var(--mantine-color-blue-light)">
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={icon}
          label ="Correo"
          placeholder="nombre@dominio.com"
          value={email}
          error="Correo inválido"
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          maw={320}
          mx="auto"
          label="Contraseña"
          placeholder="Contraseña"
          defaultValue=""
          visibilityToggleIcon={VisibilityToggleIcon}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <Button 
          variant="filled" 
          size="md" 
          radius="md">Ingresar</Button>
        <Button 
          variant="filled" 
          color="gray" 
          size="md" 
          radius="md"
          onClick={Cancelar}>Cancelar</Button>
      </Container>
    </MantineProvider>
  );
}

export default App;
