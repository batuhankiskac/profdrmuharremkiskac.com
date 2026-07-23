import styles from "./AdminForm.module.css";
import SubmitButton from "./SubmitButton";

interface AdminFormProps {
  title: string;
  action: (formData: FormData) => void | Promise<void>;
  children: React.ReactNode;
  submitLabel: string;
}

export function AdminForm({
  title,
  action,
  children,
  submitLabel,
}: AdminFormProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <form action={action} className={styles.form}>
        {children}
        <SubmitButton className={styles.button}>{submitLabel}</SubmitButton>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}

export function AdminFormField({
  label,
  htmlFor,
  hint,
  children,
}: FieldProps) {
  return (
    <div className={styles.group}>
      <label htmlFor={htmlFor}>{label}</label>
      {hint && <p className={styles.hint}>{hint}</p>}
      {children}
    </div>
  );
}

export { styles as adminFormStyles };
