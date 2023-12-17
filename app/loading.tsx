import Img from '@sohanemon/next-image';

export default function Loading() {
  return (
    <div className="grid min-h-screen place-content-center text-3xl">
      <Img className="animate-pulse" src="/public/assets/logo.svg" />
    </div>
  );
}
