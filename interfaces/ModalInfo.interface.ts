export interface ModalInfoProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
}