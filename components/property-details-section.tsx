interface PropertyDetailsSectionProps {
  children: React.ReactElement | React.ReactElement[];
  title?: string;
};

const PropertyDetailsSection = ({ children, title }: PropertyDetailsSectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative">
      {title && (
        <h3 className="text-lg font-bold mb-6">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default PropertyDetailsSection;
