'use client'
import { ComponentProps, useMemo, useState } from 'react';
import { cn } from '@sohanemon/utils';
import { Iconify } from '@sohanemon/utils/components';
import { Button, buttonVariants } from '@/components/ui/button';
import axios from 'axios';
import { paymentToken } from "../../auth/paymob/authenticate";
import PaymentIframe from '../../../components/PaymentIframe';

import { plan } from './plan.data';

type CardProps = ComponentProps<'div'> & {
  defaultPlan?: boolean;
  selectedTab: 'annually' | 'monthly' | 'free';
  pack: 'basic' | 'free' | 'premium' | 'standard';
};


export function Card({
  className,
  selectedTab,
  defaultPlan,
  pack,
  ...props
}: CardProps) {
  const data = useMemo(() => {
    switch (true) {
      case pack === 'free' && selectedTab === 'free':
        return plan[0];
      case pack === 'basic' && selectedTab === 'monthly':
        return plan[1];
      case pack === 'standard' && selectedTab === 'monthly':
        return plan[2];
      case pack === 'premium' && selectedTab === 'monthly':
        return plan[3];
      case pack === 'premium' && selectedTab === 'annually':
        return plan[4];
    }
  }, [pack, selectedTab]);
  const msg = useMemo(() => {
    switch (true) {
      case pack === 'premium' && selectedTab === 'annually':
        return 'Limited upto 6 devices';
    }
  }, [pack, selectedTab]);

  const OnChosePlan = async () => {
    // console.log("i am clicked",data)
    await paymentToken(data).then((res) => {
      // let url=`https://accept.paymobsolutions.com/api/acceptance/iframes/123?payment_token=${res}`
      // axios.get(url)
      // return <PaymentIframe paymentToken={res} iframeId={123} />
    });
    // console.log("accessToken" ,accessToken)
    // https://accept.paymobsolutions.com/api/acceptance/iframes/{{your_iframe_id}}?payment_token={{payment_token_obtained_from_step_3}}


    // const axiosConfig = {
    //   method: 'post', // HTTP request method
    //   url: 'http://localhost:3000/api', // API endpoint URL

    //   data: JSON.stringify(data),
    // };
    // await axios(axiosConfig).then((response)=>{
    //   console.log("response is here ",response)


    // }).catch((err)=>{
    //   console.log("error ",err)
    // })
  }
  if (data)
    return (
      <div
        className={cn(
          'mx-auto flex min-h-[780px] max-w-sm flex-col rounded-3xl bg-gradient-to-b from-white/10 to-transparent p-14 md:max-w-md',
          { 'from-primary to-primary/20 md:-translate-y-7': defaultPlan },
          className
        )}
        {...props}
      >
        {selectedTab === 'free' || (
          <h1 className="text-3xl  font-semibold">
            {data?.price} EGP
            <span className="text-base text-foreground/50 ">
              /{selectedTab === 'annually' ? 'year' : 'month'}
            </span>
          </h1>
        )}

        <h1 className="mt-6 text-2xl font-bold capitalize">{pack}</h1>
        <p className="text-sm font-semibold text-foreground/70">{msg}</p>
        <div className="my-6 grow space-y-3">
          {data?.benefits?.map((el) => (
            <div key={el} className="flex items-center gap-3 capitalize">
              <Iconify
                icon={'bi:patch-check-fill'}
                className={cn('shrink-0 text-primary', {
                  'text-foreground': defaultPlan,
                })}
              />{' '}
              <p>{el}</p>
            </div>
          ))}
        </div>
        <div
        >
          <Button

            className={cn('w-full', {
              'from-foreground to-foreground text-background': defaultPlan,
            })}
            onClick={OnChosePlan}
          >
            Choose Plan

          </Button>
        </div>

      </div>
    );
}
