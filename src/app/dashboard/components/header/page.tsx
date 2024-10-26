"use client"

import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import LogoImg from '@/../public/Logo.svg';
import { LogOutIcon} from 'lucide-react';
import { deleteCookie } from 'cookies-next';
import { useRouter} from 'next/navigation';
import { toast } from 'sonner';

export default function Header(){
    const router = useRouter();

    async function handleLout(){
        deleteCookie("session", {path: "/"})
        router.replace("/");
        toast.success("Usuairo deslogado com sucesso!")
    }
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <Image
                        alt='Logo Sujeito pizza'
                        src={LogoImg}
                        width={190}
                        height={60}
                        priority={true}
                        quality={100}
                    />
                </Link>

                <nav>
                    <Link href='/dashboard/category'>
                      Categoria
                    </Link>
                    <Link href='/dashboard/product'>
                      Produto
                    </Link>

                    <form action={handleLout}>
                        <button type='submit'>
                            <LogOutIcon size={24} color='#FFF'/>
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}