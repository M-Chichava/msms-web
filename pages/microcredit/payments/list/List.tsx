import React, {useEffect, useState} from 'react';
import Admin from "../../../../layouts/Admin";
import PageChange from "../../../../components/PageChange/PageChange";
import {fetchLoans} from "../../../../redux/effects/loans/effects";

const List: React.FC = () => {

    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const delay = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(delay);

    }, []);

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            {loading ? (
                <PageChange/>
            ): (
                <div className="rounded-t mb-0   border-0">
                    <div className="flex p-4 flex-wrap items-center">
                        Lista de Pagamentos
                    </div>
                </div>)
            }
        </div>
    );
};

List.layout = Admin
export default List;