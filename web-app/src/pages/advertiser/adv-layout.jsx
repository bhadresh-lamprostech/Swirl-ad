import Navbar from "./navbar"
import styles from "@/styles/Advertiser.module.scss"
import Loader from "../loader";
export default function AdvLayout({ children }) {
    return (
        <>
            <Navbar />
            <div>{children}</div>
        </>
    )
}