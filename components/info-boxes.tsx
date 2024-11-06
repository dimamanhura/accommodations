import InfoBox from "@/components/info-box";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            buttonInfo={{ text: 'Browse Properties', link: '/properties' }}
            heading="For Renters"
          >
            Find your dream rental property. Bookmark properties and contact owners.
          </InfoBox>
          <InfoBox
            backgroundColor="bg-blue-100"
            buttonInfo={{ backgroundColor: 'bg-blue-500', text: 'Add Property', link: '/properties/add' }}
            heading="For Property Owners"
          >
            List your properties and reach potential tenants. Rent as an airbnb or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  )
};

export default InfoBoxes;