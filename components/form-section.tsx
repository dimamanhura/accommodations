interface FormSectionProps {
  title?: string;
  children: React.ReactElement | React.ReactElement[];
}

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      {title && (
        <label className="block text-gray-700 font-bold">{title}</label>
      )}
      {children}
    </div>
  );
};

export default FormSection;
