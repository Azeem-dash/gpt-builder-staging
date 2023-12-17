import { ComponentProps } from 'react';
import Link from 'next/link';
import { cn } from '@sohanemon/utils';
import { Iconify } from '@sohanemon/utils/components';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { P } from '@/components/ui/text';
import { CountrySelect } from '@/components/country-select';

type FormProps = ComponentProps<'form'> & { register?: boolean };

export function Form({ className, register, ...props }: FormProps) {
  return (
    <form className={cn(' text-background', className)} {...props}>
      <div>
        <P className="text-2xl" variant={'heading'}>
          {register ? 'Sign Up' : 'Hello Again!'}
        </P>
        <P>{register ? 'Create new account' : 'Welcome back'}</P>
        <br />
        <div className="space-y-4">
          {register && (
            <Input
              icon="ant-design:user-outlined"
              placeholder="Username"
              type="text"
            />
          )}
          <Input icon="bi:phone" placeholder="Phone" type="number" />
          {register && <CountrySelect />}
          <Input
            icon="material-symbols:password"
            placeholder="Password"
            type="password"
          />
          {register && (
            <Input
              icon="material-symbols:password"
              placeholder="Confirm Password"
              type="password"
            />
          )}
          {!register && (
            <Link
              className="ml-auto block w-fit text-xs text-muted-foreground hover:text-primary"
              href={'/'}
            >
              Forgot password?
            </Link>
          )}
          {register && (
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                className="text-xs peer-aria-checked:text-gray-800 [&>a]:font-semibold"
                htmlFor="terms"
              >
                By Creating an account you agree to our{' '}
                <Link href={'/'}>Terms of Service</Link> and{' '}
                <Link href={'/'}>Privacy Policy</Link>
              </label>
            </div>
          )}
          <Button className="!mt-10 w-full ring-1 ring-black" variant={'black'}>
            {register ? 'GET STARTED FOR FREE' : 'Login'}
          </Button>
          <Button
            className="w-full bg-transparent text-background ring-1 ring-black/20"
            variant={'black'}
          >
            <Iconify
              className="mr-1 text-xl"
              icon={'flat-color-icons:google'}
            />
            CONTINUE WITH GOOGLE
          </Button>
        </div>
        <P className="mt-4 text-center text-xs">
          {register ? (
            <>
              Already have an account?{' '}
              <Link className="text-primary" href={'/auth/login'}>
                Signin
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <Link className="text-primary" href={'/auth/register'}>
                Register
              </Link>
            </>
          )}
        </P>
      </div>
    </form>
  );
}
