import { IconCalendarStats, IconFileAnalytics, IconNotes, IconPresentationAnalytics} from '@tabler/icons-react';
import { Code, Group, ScrollArea, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
// import { Redirection } from '../components/redirections';
//   import { UserButton } from '../UserButton/UserButton';
  // import { Logo } from './Logo';
import classes from '../styles/NavbarNested.module.css';
  
const mockdata = [
  { label: 'Main', icon: IconNotes, initiallyOpened: true, link:'' },
  { label: 'Users', icon: IconCalendarStats, link:'' },
  { label: 'Employees', icon: IconPresentationAnalytics, link:'../principal/employees.tsx' },
  { label: 'Factories', icon: IconFileAnalytics, link:'' }
];

const Lateral = () => {
  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    navigate(link); // Navegamos a la ruta proporcionada
  };

  const links = mockdata.map((item) => (
    <Button
      variant="subtle"
      color="blue"
      // leftIcon={<item.icon />}
      key={item.label}
      onClick={() => handleNavigation(item.link)}
      className={classes.linkButton}
    >
      {item.label}
    </Button>
  ));
  // const links = mockdata.map((item) => <Redirection {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <ScrollArea>
          {/* <Logo style={{ width: 120 }} /> */}
          <Code fw={700}>v1.0.0</Code>
        </ScrollArea>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        {/* <UserButton /> */}
      </div>
    </nav>
  );
}

export default Lateral;