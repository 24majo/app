import { Code, ScrollArea, Button, AppShell, Burger, Avatar, Group, Text, UnstyledButton, Menu, Badge } from '@mantine/core';
import { IconChartLine, IconUsers, IconCube, IconWorld, IconChevronCompactUp, IconLogout } from '@tabler/icons-react';
import classes from '../styles/NavbarNested.module.css';
import { useDisclosure } from '@mantine/hooks';
import { forwardRef } from 'react';
  
const mockdata = [
  { label: 'Main', icon: IconChartLine, initiallyOpened: true},
  { label: 'Users', icon: IconUsers},
  { label: 'Employees', icon: IconCube},
  { label: 'Factories', icon: IconWorld}
];

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  letter: string;
  name: string;
  role: string;
  isDesktop: boolean;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ letter, name, role, isDesktop, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar color="blue" key={name} name={name}></Avatar>
      
        <div style={{ flex: 1}}>
          {isDesktop && (
            <>
            <Text size="sm" fw={500}> {name} </Text>
            <Badge variant="light" color="blue" radius="lg" size='xs'>{role}</Badge>
            <IconChevronCompactUp size={16} style={{marginLeft:30}}/>
            
            </>
          )}
        </div>

      </Group>
    </UnstyledButton>
  )
);

export function Lateral() {
  const [mobileOpened] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  

  const links = mockdata.map((item) => (
    <Button
      variant="subtle"
      color="black"
      key={item.label}
      className={classes.linkButton}
      fullWidth 
      style={{ 
        display: 'flex', 
        justifyContent: 'flex-start', 
        paddingLeft: 25 }}
    >
      <item.icon style={{ marginRight: 10 }} />
      { (desktopOpened || mobileOpened) ? (
        <span>{item.label}</span> 
      ) : null }
    </Button>
  ));

  return (
    <AppShell
      header={{ height: 30 }}
      navbar=
      {{ 
        width: desktopOpened ? 227 : 80, 
        breakpoint: 'sm', 
      }}
      layout='alt'
    >

      <AppShell.Navbar p="md" style={{ backgroundColor: '#F8F9FA' }}> 

        <ScrollArea className={classes.burguer}>
          <Burger opened={desktopOpened} onClick={toggleDesktop} size="sm" />
          {(mobileOpened || desktopOpened) && (
            <Code fw={700} className={classes.code}> v1.0.0 </Code>
          )}
        </ScrollArea>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
        
        <ScrollArea className={classes.user}>
          <Menu>
            <Menu.Target>
              <UserButton
                letter="Nombre"
                name="Nombre"
                role="Administrador"
                isDesktop={desktopOpened}
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                color="red"
                leftSection={<IconLogout size={14} />}
              >
                Cerrar Sesión
              </Menu.Item>
            </Menu.Dropdown>

          </Menu>
        </ScrollArea>
        
      </AppShell.Navbar>
    </AppShell>
  );
}