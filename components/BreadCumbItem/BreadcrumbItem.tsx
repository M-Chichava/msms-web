import Link from "next/link";
import translateLabel from "../../api/config/dictionary";

interface BreadcrumbItem {
    path: string;
    label: string;
    isActive: boolean;
    isDisabled: boolean;
}

const BreadcrumbItem: React.FC<BreadcrumbItem> =({path, label, isActive, isDisabled}) => {
    const translatedLabel = translateLabel(label).toLocaleUpperCase();


    if (isDisabled) {
        return <span style={{
            textDecoration: 'none',
            color: '#e5f0f6',
            fontSize:'13px'
        }}>{translatedLabel}</span>;
    }

    return (
        <Link
            className="hover:text-blueGray-300"
            style={{

                textDecoration: 'none',
                fontSize:'13px'
            }}
            href={path}
        >
          {translatedLabel}
        </Link>
    )
}

export default BreadcrumbItem;