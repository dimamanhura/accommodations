interface PropertiesGridProps {
  children: React.ReactElement | React.ReactElement[];
}

const PropertiesGrid = async ({ children }: PropertiesGridProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {children}
    </div>
  );
};

export default PropertiesGrid;
