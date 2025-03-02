interface PropertiesLayoutProps {
  children: React.ReactNode;
};

const PropertiesLayout = ({ children }: PropertiesLayoutProps) => {
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-4'>
        {children}
      </div>
    </section>
  );
};

export default PropertiesLayout;
