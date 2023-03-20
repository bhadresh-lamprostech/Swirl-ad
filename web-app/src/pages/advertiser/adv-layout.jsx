import Navbar from "./navbar"
export default function AdvLayout({children}) {
    return(
        <>
            <Navbar />
            <div>{children}</div>
        </>
    )
}