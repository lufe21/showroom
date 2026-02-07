export const metadata = {
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}

