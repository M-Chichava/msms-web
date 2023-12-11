import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from "next/router"
import loadingImage from '../../public/img/brand/loading.svg'
import Admin from "layouts/Admin";
import Image from "next/image";
import Logo from "../Logo/logo";
import LoadingText from '../../public/img/loadText.gif';
import { RootState } from "../../redux/reducers";
import { useSelector } from "react-redux";

const PageChange = (props) => {
    const [newSecond, setNewSecond] = useState<boolean>(false);
    const [time, setTime] = useState<Date>(new Date());
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); // Adjust this based on your Redux store
    const router = useRouter(); // Use useRouter here

    useEffect(() => {
        setNewSecond(!newSecond);
        setTimeout(() => setTime(new Date()), 2000);

        if (!isAuthenticated) {
            router.push('/auth/login');
        }
    }, [time, isAuthenticated, router]);

    if (isAuthenticated) {
        return (
            <main>
                <div className='flex flex-col bg-white rounded-md w-full my-1 p-5 '>
                    <div className='flex justify-center items-center'>
                        <div className='flex flex-col justify-center items-center animated-svg'>
                            <Image src={LoadingText} alt="Texto" />
                        </div>
                    </div>
                </div>
            </main>
        );
    } else {
        return null;
    }
};

PageChange.layout = Admin;
export default PageChange;
