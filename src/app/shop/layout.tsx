import "@/app/globals.css"

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="wrapper">
            {children}
        </div>
    )
}