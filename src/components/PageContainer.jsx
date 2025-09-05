export default function PageContainer({ children, className = '' }) {
  return (
    <div className={`container mx-auto px-4 py-12 ${className}`}>
      {children}
    </div>
  );
}
