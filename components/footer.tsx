import { ComponentProps } from 'react';
import Link from 'next/link';
import { cn } from '@sohanemon/utils';
import { Iconify } from '@sohanemon/utils/components';

import { Brand } from './brand';

type FooterProps = ComponentProps<'div'>;

export function Footer({ className, ...props }: FooterProps) {
  return (
    <div
      className={cn(
        'container grid grid-cols-1 gap-10 pb-12 pt-32 md:grid-cols-5 ',
        className
      )}
      {...props}
    >
      <Brand />
      {links.map((el) => (
        <div key={el.label} className="space-y-6">
          <h4 className=" text-lg font-bold leading-7 ">{el.label}</h4>
          {el.links.map((link) => (
            <Link
              key={link.label}
              className="block font-medium text-gray-200 transition-all hover:text-primary"
              href={link.link}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}
      <div>
        <h4 className=" text-lg font-bold leading-7 ">Follow us </h4>
        <div className="flex gap-4 py-6">
          {socials.map((el) => (
            <div
              key={el.icon}
              className="rounded-full  p-px"
              style={{
                backgroundImage:
                  'linear-gradient(148deg, #642CB6 -24.15%, #2CB49F 84.3%)',
              }}
            >
              <Link
                className="block rounded-full bg-background p-1.5 transition-all hover:[background:_linear-gradient(148deg,_#642CB6_-24.15%,_#2CB49F_84.3%)]"
                href={el.link}
              >
                <Iconify icon={el.icon} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <hr className="col-span-full border-opacity-20" />
      <center className="col-span-full text-sm leading-tight text-stone-100">
        Copyright © 2023 GPT Guider All rights reserved
      </center>
    </div>
  );
}

const links = [
  {
    label: 'Home',
    links: [
      { label: 'Features', link: '' },
      { label: 'Pricing', link: '' },
      { label: 'About us', link: '' },
    ],
  },
  {
    label: 'Terms',
    links: [
      { label: 'Privacy Policy', link: '' },
      { label: 'Terms and Conditions', link: '' },
      { label: 'Copyright Policy', link: '' },
      { label: 'Security', link: '' },
    ],
  },
  {
    label: 'Support',
    links: [
      { label: 'FAQs', link: '' },
      { label: 'Contact us', link: '' },
      { label: 'Help', link: '' },
    ],
  },
];

const socials = [
  { icon: 'mdi:twitter', link: '' },
  { icon: 'gg:facebook', link: '' },
  { icon: 'ri:linkedin-fill', link: '' },
];
