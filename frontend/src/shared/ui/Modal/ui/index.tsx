"use client";

import { cn } from "@utils/cn";
import { ReactNode } from "react";
import ReactModal from 'react-modal';

export interface ModalProps {
	children?: ReactNode;
	open?: boolean;
	className?: string;
	onClose?: () => void;
}

export function Modal({
	children, open, className=""
}: Readonly<ModalProps>) {
	if(!open) return null;

	return (
		<ReactModal
		isOpen={open}
		ariaHideApp={false}
		overlayClassName={"fixed inset-0 bg-black/50"}
		className="mx-auto w-min min-w-2/5 min-h-screen flex flex-col justify-center outline-0"
		>
			<div className={cn("flex flex-col justify-center bg-white items-center p-8 gap-4 text-center", className)}>
				{children}
			</div>
		</ReactModal>
	)
}