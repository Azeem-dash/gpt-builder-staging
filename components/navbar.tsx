'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn, isNavActive } from '@sohanemon/utils';
import { useClickOutside } from '@sohanemon/utils/hooks';
import { AnimatePresence } from 'framer-motion';

import { siteConfig } from '@/config/site';
import useNavToggle from '@/hooks/nav-toggle';

import { Brand } from './brand';
import { Icons } from './icons';
import { Motion } from './motion';
import { Button } from './ui/button';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { hidden, leaved } = useNavToggle();

  return (
    <Motion
      animate={hidden ? 'top' : 'visible'}
      transition={{ delay: 0.1, duration: 0.5 }}
      className={cn('sticky inset-x-0 top-0 z-40 bg-transparent', {
        'shadow-lg shadow-primary/10 backdrop-blur-md': leaved,
      })}
    >
      <nav className="container flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <Brand />
        </div>
        <NavContent />
        {!isMenuOpen ? (
          <Icons.menu
            className="cursor-pointer text-foreground lg:hidden"
            onClick={() => setIsMenuOpen(true)}
          />
        ) : (
          <Icons.x
            className="cursor-pointer text-foreground lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
      <AnimatePresence>
        {isMenuOpen && <NavContentMob setIsMenuOpen={setIsMenuOpen} />}
      </AnimatePresence>
    </Motion>
  );
}

const NavContent = () => {
  const path = usePathname();
  return (
    <>
      <ul className="ml-20 flex items-center gap-7 font-medium max-lg:hidden ">
        {siteConfig.nav.map((_) => (
          <li
            key={_.title}
            className={cn('relative', {
              'text-primary': isNavActive(_.href, path),
            })}
          >
            <h3 className="px-3 capitalize">
              <Link href={_.href}>{_.title}</Link>
            </h3>
            {isNavActive(_.href, path) && (
              <Motion
                as="span"
                className="absolute inset-0 -z-10 rounded-md bg-primary/20 "
                layoutId="nav-bg"
              />
            )}
          </li>
        ))}
      </ul>
      <div className="space-x-8 max-lg:hidden">
        <Link href="/auth/login">
          <Button variant={'outline'}>Sign in</Button>
        </Link>
        <Link href="/auth/register">
          <Button>Sign up</Button>
        </Link>
      </div>
    </>
  );
};

const NavContentMob = ({ setIsMenuOpen }: { setIsMenuOpen: Function }) => {
  const ref = useClickOutside(() => setIsMenuOpen(false));
  return (
    <Motion
      key={'header'}
      ref={ref}
      animate="visible"
      as={'ul'}
      className="absolute inset-x-0 mx-2 flex flex-col items-start gap-4 rounded-xl bg-background p-5 shadow-xl lg:hidden"
      exit={'left'}
      initial="top"
    >
      {siteConfig.nav.map((_) => (
        <li key={_.title} onClick={() => setIsMenuOpen(false)}>
          <span className="capitalize hover:text-primary/50">
            <Link href={_.href}>{_.title}</Link>
          </span>
        </li>
      ))}
      <div className="space-x-8 lg:hidden">
        <Link href="/auth/login">
          <Button variant={'outline'}>Sign in</Button>
        </Link>
        <Link href="/auth/register">
          <Button>Sign up</Button>
        </Link>
      </div>
    </Motion>
  );
};
