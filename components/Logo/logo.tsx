import React from 'react';
import Loading from '../../public/img/load.gif'
import Image from "next/image";
const Logo = ({ color }) => {
    return (
        <Image
            src={Loading}
            alt="Carregando..."
            style={{ height: '200px', width: '200px' }}
        />
    );
};

export default Logo;
