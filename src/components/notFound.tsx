import { Button, Container, Group, Text, Title } from '@mantine/core'
import classes from '../styles/NotFound.module.css'

export function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Encontraste un lugar secreto.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Lamentablemente, esta es solo una página 404. Es posible que haya escrito mal la dirección o que la página se haya movido a otra URL.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="lg" className={classes.button}>
          Llévame de vuelta a la página de inicio
        </Button>
      </Group>
    </Container>
  );
}