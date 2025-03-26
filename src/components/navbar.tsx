import { IconCalendarStats, IconFileAnalytics, IconNotes, IconPresentationAnalytics} from '@tabler/icons-react';
import { Code, Group, ScrollArea, Button, Container, Text, Skeleton, AppShell, Burger} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
// import { Redirection } from '../components/redirections';
import { UserButton } from '../components/user'
import classes from '../styles/NavbarNested.module.css';
import { useDisclosure } from '@mantine/hooks';
  
const mockdata = [
  { label: 'Main', icon: IconNotes, initiallyOpened: true, link:'' },
  { label: 'Users', icon: IconCalendarStats, link:'' },
  { label: 'Employees', icon: IconPresentationAnalytics, link:'../principal/employees.tsx' },
  { label: 'Factories', icon: IconFileAnalytics, link:'' }
];

export function Lateral() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  const links = mockdata.map((item) => (
    <Button
      variant="subtle"
      color="blue"
      // leftIcon={<item.icon />}
      key={item.label}
      className={classes.linkButton}
      fullWidth 
    >
      {item.label}
    </Button>
  ));
  // const links = mockdata.map((item) => <Redirection {...item} key={item.label} />);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >

      <AppShell.Navbar p="md">
        <div className={classes.header}>
        
          <ScrollArea>
            {/* <Logo style={{ width: 120 }} /> */}
            <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
            <Code fw={700}>v1.0.0</Code>
          </ScrollArea>
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>

        <div className={classes.footer}>
          <UserButton />
        </div>
      </AppShell.Navbar>

    </AppShell>


    // <div>
    //   <nav className={classes.navbar}>
        // <div className={classes.header}>
        //   <ScrollArea>
        //     {/* <Logo style={{ width: 120 }} /> */}
        //     <Code fw={700}>v1.0.0</Code>
        //   </ScrollArea>
        // </div>

        // <ScrollArea className={classes.links}>
        //   <div className={classes.linksInner}>{links}</div>
        // </ScrollArea>

        // <div className={classes.footer}>
        //   <UserButton />
        // </div>
    //   </nav>
    // </div>
  );
}