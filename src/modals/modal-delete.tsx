import { Modal, Text, Button } from '@mantine/core';

interface ModalDeleteProps {
    opened: boolean; 
    onClose: () => void;
    onConfirm: () => void; 
  }

export function ModalDelete({ opened, onClose, onConfirm }: ModalDeleteProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Eliminar" centered>
      <Text style={{ marginBottom: 20 }}>
        ¿Está seguro que quiere eliminar esto?
      </Text>

      <Button
        color="red"
        fullWidth
        style={{ marginBottom: 5 }}
        onClick={onConfirm} 
      >
        Aceptar
      </Button>

      <Button variant="transparent" color="gray" fullWidth onClick={onClose}>
        Cancelar
      </Button>
    </Modal>
  );
}
