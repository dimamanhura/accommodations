import Link from "next/link";


interface InfoBoxProps {
  backgroundColor?: string;
  buttonInfo: {
    backgroundColor?: string,
    text: string,
    link: string,
  };
  textColor?: string;
  children: React.ReactNode;
  heading: string;
}

const InfoBox = ({
  backgroundColor = 'bg-gray-100',
  buttonInfo,
  textColor = 'text-gray-800',
  children,
  heading,
}: InfoBoxProps) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>
        {children}
      </p>
      <Link
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor || 'bg-black'} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  )
};

export default InfoBox;
