import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1
        className={`${inter.className} m-0 mb-20 text-4xl opacity-50`}
      >
        press "continue" to proceed to the Temple
      </h1>
      <Link
        href={"/facts"}
        className="bg-neutral-900 px-8 py-3 font-semibold rounded-md text-neutral-300 transition-all 
        hover:bg-green-800 hover:text-green-300 hover:scale-110  
        focus:bg-green-800 focus:text-green-300 focus:scale-110
        "
      >
        continue
      </Link>
    </>
  );
}
