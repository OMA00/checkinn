import Link from "next/link";
import { BreadCrumb } from "../navigation/breadcrumb";

type Props = {
  items: BreadCrumb[];
};

export function Breadcrumbs({ items }: Props) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <ol className="flex flex-wrap gap-2">
        {items.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2">
            <Link href={crumb.href} className="hover:underline">
              {crumb.label}
            </Link>
            {index < items.length - 1 && <span>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
