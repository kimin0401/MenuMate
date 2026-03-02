import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: './PretendardStd-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './PretendardStd-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './PretendardStd-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});
