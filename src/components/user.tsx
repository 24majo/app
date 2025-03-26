import { IconChevronCompactUp, IconLogout } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton, Menu, Badge } from '@mantine/core';
import classes from '../styles/user.module.css';

export function UserButton() {

  const names = [
    'John Doe'
  ];

  const avatars = names.map((name) => <Avatar key={name} name={name} color="initials" />);
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        {avatars}

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            'John Doe'
          </Text>

          <Badge color="gray" radius="lg">Rol</Badge>
        </div>

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconChevronCompactUp size={20}/>
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

        
      </Group>
    </UnstyledButton>
  );
}