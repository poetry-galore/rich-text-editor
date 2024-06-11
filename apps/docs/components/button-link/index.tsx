import React from "react";
import Link from "next/link";

type ButtonProps = { label: string; to: string };

export default function ButtonLink({ label, to }: ButtonProps) {
  return (
    <>
      <Link href={to}>
        <button className="p-3 rounded-xl text-white font-bold bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 dark:from-sky-600 dark:to-blue-700 dark:hover:from-sky-400 dark:hover:to-blue-600 hover:ring-2 ring-offset-2 hover:ring-sky-400 dark:ring-offset-black">
          {label}
        </button>
      </Link>
    </>
  );
}
