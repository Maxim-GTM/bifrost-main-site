import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="llm-calc-breadcrumbs" aria-label="Breadcrumb">
            <ol>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.href ? (
                            <Link href={item.href} className="llm-calc-breadcrumb-link">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="llm-calc-breadcrumb-current">{item.label}</span>
                        )}
                        {index < items.length - 1 && (
                            <span className="llm-calc-breadcrumb-separator" aria-hidden="true">
                                {">"}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
