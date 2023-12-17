import { P } from '@/components/ui/text';
import { Brand } from '@/components/brand';
import { TrustedBy } from '@/components/trusted-by';

import { Form } from './form';

type LoginCardProps = { register?: boolean };

export function LoginCard({ register }: LoginCardProps) {
  return (
    <div className="min-h-screen grid-cols-[5fr_4fr] items-center overflow-hidden bg-gradient-to-t from-background to-background/80 shadow-2xl max-md:grid-cols-1 md:grid ">
      <div className="px-20 max-md:hidden">
        <Brand className="text-4xl" />

        <P className="pt-8 leading-relaxed text-white">
          Powered by GPT 3.5 & GPT 4
        </P>
        <TrustedBy className="py-2.5" />
      </div>
      <div className="grid h-full items-center bg-foreground">
        <Form className=" max-md:p-8 md:px-20" register={register} />
      </div>
    </div>
  );
}
