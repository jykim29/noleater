import AnimatedBackground from '@/components/landing/AnimatedBackground';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AnimatedBackground>{children}</AnimatedBackground>;
}
