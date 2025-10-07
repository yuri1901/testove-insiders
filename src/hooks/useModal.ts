import { useCallback } from "react";

interface UseModalProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  submitButtonColor?: "blue" | "green";
}

export const useModal = ({ onSubmit, onClose, submitButtonColor = "blue" }: UseModalProps) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent, formData: any) => {
      e.preventDefault();
      onSubmit(formData);
    },
    [onSubmit]
  );

  const getSubmitButtonClasses = useCallback(() => {
    const baseClasses = "px-6 py-2 rounded-md text-base font-medium transition-colors cursor-pointer";
    if (submitButtonColor === "green") {
      return `bg-green-500 hover:bg-green-600 text-white ${baseClasses}`;
    }
    return `bg-blue-500 hover:bg-blue-600 text-white ${baseClasses}`;
  }, [submitButtonColor]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return {
    handleSubmit,
    getSubmitButtonClasses,
    handleBackdropClick,
  };
};
