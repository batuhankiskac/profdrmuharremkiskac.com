"use client";

import { startTransition, useActionState } from "react";
import type { FormState } from "@/app/admin/actions";
import SubmitButton from "./SubmitButton";
import styles from "./AdminForm.module.css";

interface AdminActionFormProps {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
  children: React.ReactNode;
}

export default function AdminActionForm({
  action,
  submitLabel,
  children,
}: AdminActionFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  // Form action yerine onSubmit kullanılır; böylece hata durumunda React
  // formu sıfırlamaz ve girilen içerik kaybolmaz.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {children}
      {state.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}
      <SubmitButton className={styles.button} pending={pending}>
        {submitLabel}
      </SubmitButton>
    </form>
  );
}
