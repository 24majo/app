import { Code, ScrollArea, Button, AppShell, Burger, useMantineTheme } from '@mantine/core';
import { IconChartLine, IconUsers, IconCube, IconWorld } from '@tabler/icons-react';
import { UserButton } from './user'
import classes from '../styles/NavbarNested.module.css';
import { useDisclosure } from '@mantine/hooks';
  
const mockdata = [
  { label: 'Main', icon: IconChartLine, initiallyOpened: true},
  { label: 'Users', icon: IconUsers},
  { label: 'Employees', icon: IconCube},
  { label: 'Factories', icon: IconWorld}
];

export function Lateral() {
  const theme = useMantineTheme()
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
      {item.label}
    </Button>
  ));
  // const links = mockdata.map((item) => <Redirection {...item} key={item.label} />);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar=
      {{ 
        width: desktopOpened ? 227 : 70, 
        breakpoint: 'sm', 
      }}
      padding="md"
    >

      <AppShell.Header>
        <ScrollArea>
          <Burger opened={desktopOpened} onClick={toggleDesktop} size="sm" />
          { (mobileOpened || desktopOpened) && (
            <Code fw={700} className={classes.code}>
              v1.0.0
            </Code>
          )}
        </ScrollArea>
      </AppShell.Header>

      <AppShell.Navbar p="md"> 

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>

        <AppShell.Section
          style={{
            borderBlockStart: `1px solid ${theme.colors.gray[3]}`,
          }}
        >

          <UserButton />
        </AppShell.Section>
          
      </AppShell.Navbar>
    </AppShell>

  );
}