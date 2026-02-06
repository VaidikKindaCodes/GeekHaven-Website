import './design.css';

export const metadata = {
  title: 'GeekHaven Design Wing',
  description: 'The creative layer of IIIT Allahabad',
};

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="design-root bg-zinc-50 min-h-screen">{children}</div>;
}
