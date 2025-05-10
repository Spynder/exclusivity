import { Button, Modal, ModalProps } from "@ui";

export function FileTooBigModal({
	open, onClose
}: Readonly<ModalProps>) {
	return (
		<Modal open={open}>
			<span className="font-medium text-2xl">Ошибка загрузки файла</span>
			<p>
				Пожалуйста, проверьте размер и формат файла согласно требованиям.<br />
				{'('}их вы можете увидеть под место для загрузки{')'}
			</p>
			<Button onClick={onClose}>Закрыть</Button>
		</Modal>
	)
}