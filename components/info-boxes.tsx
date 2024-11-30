import InfoBox from "@/components/info-box";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg">
          <InfoBox
            linkTitle="Browse Properties"
            heading="For Renters"
            link="/properties"
          >
            Find your dream rental property. Bookmark properties and contact owners.
          </InfoBox>
          <InfoBox
            linkTitle="For Property Owners"
            heading="For Property Owners"
            link="/properties/add"
          >
            List your properties and reach potential tenants. Rent as an airbnb or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  )
};

export default InfoBoxes;