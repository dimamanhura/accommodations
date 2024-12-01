'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  getProviders,
  useSession,
  signOut,
  signIn,
} from 'next-auth/react';
import { usePathname } from 'next/navigation';
import {
  DropdownTrigger,
  NavbarContent,
  DropdownItem,
  DropdownMenu,
  NavbarBrand,
  NavbarItem,
  Dropdown,
  Avatar,
  Navbar as Nav,
  Button,
  Link,
} from "@nextui-org/react";
import logo from '@/assets/images/logo.png';
import NextLink from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import UnreadMessageCount from '@/components/unread-message-count';

interface ProvidersType {
  [key: string]: {
    id: string;
  };
};

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [providers, setProviders] = useState<ProvidersType | null>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    }

    setAuthProviders();
  }, []);

  return (
    <Nav>
      <NavbarBrand href="/" as={NextLink}>
        <Image
          className="h-10 w-auto"
          src={logo}
          alt="PropertyPulse"
        />
        <p className="font-bold text-inherit ml-4">Property Pulse</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === '/'}>
          <Link
            color={pathname === '/' ? 'primary' : 'foreground'}
            href="/"
            as={NextLink}
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/properties'}>
          <Link
            color={pathname === '/properties' ? 'primary' : 'foreground'}
            href="/properties"
            as={NextLink}
          >
            Properties
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/properties/add'}>
          <Link
            color={pathname === '/properties/add' ? 'primary' : 'foreground'}
            href="/properties/add"
            as={NextLink}
          >
            Add Property
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {session ? (
          <>
            <UnreadMessageCount />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={session?.user?.name || ''}
                  size="sm"
                  src={session?.user?.image || ''}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  href="/profile"
                  as={NextLink}
                >
                  Your Profile
                </DropdownItem>
                <DropdownItem
                  key="saved_properties"
                  href="/properties/saved"
                  as={NextLink}
                >
                  Saved Properties
                </DropdownItem>
                <DropdownItem
                  key="messages"
                  href="/messages"
                  as={NextLink}
                >
                  Messages
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <>
            {providers && Object.values(providers).map((provider, index) => (
              <NavbarItem key={index}>
                <Button
                  startContent={<FaGoogle />}
                  variant="flat"
                  color="primary"
                  onClick={() => signIn(provider.id)}
                >
                  Login or Register
                </Button>
              </NavbarItem>
            ))}
          </>
        )}
       
      </NavbarContent>
    </Nav>
  );
};

export default Navbar;
