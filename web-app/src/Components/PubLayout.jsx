import Navbar from "@/pages/publisher/navbar";

export default function PubLayout({ children }) {
    return (
        <>
            <Navbar />
            <div>{children}</div>
        </>
    )
}