import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export default function PageNavigation() {
  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  const handleForwardButton = () => {
    router.forward();
  };

  const hasBack = router.asPath !== router.pathname;
  const hasForward = router.route !== router.pathname;

  return (
    <div className="hidden sm:flex w-24 justify-between">
      <button
        type="button"
        onClick={handleBackButton}
        className={`w-8 h-8 ${
          hasBack ? 'cursor-pointer' : 'cursor-not-allowed'
        }`}
        disabled={!hasBack}
      >
        <IconChevronLeft
          className={hasBack ? 'text-slate-800' : 'text-slate-300'}
        />
      </button>
      <button
        type="button"
        onClick={handleForwardButton}
        className={`w-8 h-8 ${
          hasForward ? 'cursor-pointer' : 'cursor-not-allowed'
        }`}
        disabled={!hasForward}
      >
        <IconChevronRight
          className={hasForward ? 'text-slate-800' : 'text-slate-300'}
        />
      </button>
    </div>
  );
}
