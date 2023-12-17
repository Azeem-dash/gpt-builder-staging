import { ComponentProps } from 'react';
import Img from '@sohanemon/next-image';
import { cn } from '@sohanemon/utils';

import { M, Motion } from '@/components/motion';
import { Sect } from '@/components/sect';

type ExplanationProps = ComponentProps<'div'>;

export function Explanation({ className, ...props }: ExplanationProps) {
  return (
    <div className={cn('space-y-12 md:space-y-32', className)} {...props}>
      <Sect rtl label="Browsing Plugin">
        <Img src="/public/assets/explanations/bp-bg.svg" />
        <M
          className="absolute inset-0 m-auto grid place-content-center"
          initial={{ scale: 2, opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          whileInView={{ scale: 1, opacity: 1 }}
        >
          <Img src="/public/assets/explanations/glass.svg" width={500} />
        </M>
      </Sect>
      <Sect label="GPT Prof">
        <Motion animate="fall">
          <Img src="/public/assets/explanations/gp-bg.svg" />
        </Motion>
        <Motion animate="rise" className="absolute bottom-0 left-1/2 top-1/2">
          <Img src="/public/assets/explanations/gp-robot.svg" width={163} />
        </Motion>
      </Sect>
      <Sect rtl label="DOCUMENT OCR AI">
        <Motion animate="fall">
          <Img src="/public/assets/explanations/doa.svg" />
        </Motion>
      </Sect>
      <Sect label="Chat With PDF ">
        <Motion animate="fall">
          <Img src="/public/assets/explanations/cwpdf.svg" />
        </Motion>
      </Sect>
      <Sect rtl label="Audio & video Transcription and summarizing">
        <Motion animate="fall">
          <Img src="/public/assets/explanations/avts.svg" />
        </Motion>
      </Sect>
      <Sect label="Diagram plugin ">
        <Motion animate="fall">
          <Img src="/public/assets/explanations/dp.svg" />
        </Motion>
      </Sect>
      <Sect rtl label="YouTube video Transcription and summarizing">
        <Motion animate="fall">
          <Img src="/public/assets/explanations/yvts.svg" />
        </Motion>
      </Sect>
      <Sect label="Questions & Answers Generator">
        <Motion animate="fall">
          <Img src="/public/assets/explanations/qnag.svg" />
        </Motion>
      </Sect>
    </div>
  );
}
