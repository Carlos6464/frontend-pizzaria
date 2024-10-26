import styles from '../../app/page.module.scss'
import logoImg from '../../../public/Logo.svg'
import Image from 'next/image';
import Link from 'next/link';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import {api} from '@/services/api';
import { redirect} from 'next/navigation'

export default function Signup(){

    async function handleRegister(formData: FormData){
        "use server"
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        

        if(name === "" || email === "" || password === ""){
            console.log("PREENCHA TODOS OS CAMPOS");
            return
        }

        try {
            await api.post("/user",{
                name, email, password
            });
        } catch (error) {
            console.log("error");
            console.log(error);
            return 
        }

        redirect('/')
        
    }

    return (
        <>
            <div className={styles.containerCenter}>
                <Image
                    src={logoImg}
                    alt='Logo da Pizzaria'
                />

                <section className={styles.login}>
                    <p className={styles.textCadastro}>Criando sua conta</p>
                    <form action={handleRegister}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Digite seu nome..."
                        required={true}
                    />

                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite seu email..."
                        required={true}
                    />

                    <Input
                        type="password"
                        name="password"
                        placeholder="**************"
                        required={true}
                    />

                    <Button type="submit" text="Cadastrar" />
                    </form>

                    {/* Remove a tag 'a' e aplica o className diretamente no Link */}
                    <Link href='/' className={styles.text}> 
                        Já possui uma conta? login
                    </Link>
                </section>
            </div>
        </>
    )
}