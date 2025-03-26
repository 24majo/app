import { Container, Button, Checkbox, Title, Text } from '@mantine/core'
import { TextInput, PasswordInput } from '@mantine/core'
import { IconLock } from '@tabler/icons-react'
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react'
// import './App.css'
import './styles/App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate(); 

  const enter = () => {
    navigate('/dashboard'); 
  };

  const icon = <IconLock size={18} stroke={1.5} />;

  const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? (
      <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    ) : (
      <IconEyeCheck style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
    );

  return (
      <div className="flex-container">
        <Container size="responsive" className='main-container'>
    
          <Title
            style={{padding: '0vh 3vh'}}
          >
            Ingresar a mi cuenta
          </Title>

          <Text
            style={{padding: '0vh 3vh'}}>
            Accede a tu cuenta por medio de tu nombre de usuario y contraseña.
          </Text>

          <TextInput
            leftSectionPointerEvents="none"
            label ="Nombre de Usuario"
            placeholder="Ingresa tu usuario"
            name='user'
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

          <Checkbox
            label="Recordar mi cuenta y mis datos para un próximo ingreso"
            name='remember'
            required
            style={{padding: '0vh 3vh', color: '#868E96'}}
            color='#228BE6'
          />

          <Button 
            variant="filled" 
            size="md" 
            radius="md"
            style={{ 
              marginTop: '5vh',
              marginLeft: '3vh',
              width: '92%',
            }}
            color='#228BE6'
            onClick={enter}
          >
            Entrar
          </Button>
        </Container>

        <Container size="responsive" className='image-container'></Container>
      </div>
  );
}

export default App;