import { Code, ScrollArea, AppShell, Burger, Avatar, Group, Text, UnstyledButton, Menu, Badge, NavLink, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconChartLine, IconUsers, IconCube, IconWorld, IconChevronCompactUp, IconLogout, IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import classes from '../styles/Navbar.module.css';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  letter: string;
  name: string;
  role: string;
  isDesktop: boolean;
  isMobile: boolean;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ letter, name, role, isDesktop, isMobile, ...others }: UserButtonProps, ref) => (
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
          {!isMobile && isDesktop && (
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
  const isMobile = useMediaQuery('(max-width: 960px)');
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const navigate = useNavigate()
  const {setColorScheme} = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme("light")
    
  const color = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
  } 

  return (
    <AppShell
      header={{ height: 30 }}
      navbar={{
        width: isMobile ? 80 : (desktopOpened ? 227 : 80), 
        breakpoint: 'xs', 
      }}
      layout="alt"
    >
      <AppShell.Navbar p="md" color="gray">
        <ScrollArea className={classes.burguer}>
          <Burger opened={desktopOpened} onClick={toggleDesktop} size="sm" />
          {!isMobile && desktopOpened && (
            <Code fw={700} className={classes.code}> v2.0.0 </Code>
          )}
        </ScrollArea>

        <ScrollArea className={classes.links}>
        <NavLink
          label={!isMobile && desktopOpened ? (
            <>
              <IconChartLine style={{marginRight: 4}} /> <span>Main</span>
            </>
          ) : (
            <IconChartLine />
          )}
          onClick={() => navigate('/dashboard')}
        />

        <NavLink
          label={!isMobile && desktopOpened ? (
            <>
              <IconCube style={{marginRight: 4}} /> <span>Employees</span>
            </>
          ) : (
            <IconCube />
          )}
          onClick={() => navigate('/dashboard/employees')}
        />

        <NavLink
          label={!isMobile && desktopOpened ? (
            <>
              <IconUsers style={{marginRight: 4}} /> <span>Users</span>
            </>
          ) : (
            <IconUsers />
          )}
          onClick={() => navigate('/dashboard/users')}
        />

        <NavLink
          label={!isMobile && desktopOpened ? (
            <>
              <IconWorld style={{marginRight: 4}} /> <span>Factories</span>
            </>
          ) : (
            <IconWorld />
          )}
          onClick={() => navigate('/dashboard/factories')}
        />
          
        </ScrollArea>
        
        <ScrollArea className={classes.user}>
          <Menu>
            <Menu.Target>
              <UserButton
                letter="Nombre"
                name="Nombre"
                role="Administrador"
                isDesktop={desktopOpened}
                isMobile={isMobile ?? false}
              />
            </Menu.Target>

            <Menu.Dropdown>

              <Menu.Item 
                leftSection={
                  computedColorScheme === 'dark' ? <IconSunFilled /> : <IconMoonFilled />
                }
                onClick={color} 
              >
                <Text>
                  {computedColorScheme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                </Text>
              </Menu.Item>

              <Menu.Item
                color="red"
                leftSection={<IconLogout size={20} />}
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