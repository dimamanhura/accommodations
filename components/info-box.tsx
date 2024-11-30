import { Button } from "@nextui-org/react";
import Link from "next/link";


interface InfoBoxProps {
  linkTitle: string;
  children: React.ReactNode;
  heading: string;
  link: string;
}

const InfoBox = ({
  linkTitle,
  children,
  heading,
  link,
}: InfoBoxProps) => {
  return (
    <div className={'bg-blue-50 p-6 rounded-lg shadow-md'}>
      <h2 className={'text-default-700 text-2xl font-bold'}>
        {heading}
      </h2>
      <p className={'text-default-500 mt-2 mb-4'}>
        {children}
      </p>
      <Button href={link} color="primary" as={Link}>
        {linkTitle}
      </Button>
    </div>
  )
};

export default InfoBox;
