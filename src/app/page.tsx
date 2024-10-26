import styles from './page.module.scss'
import logoImg from './../../public/Logo.svg'
import Image from 'next/image';
import Link from 'next/link';
import Input from './components/input/Input';
import Button from './components/button/Button';
import {api} from '@/services/api';
import { cookies } from 'next/headers';
import { redirect} from 'next/navigation'


export default function Login() {
  async function handleLogin(formData: FormData){
    "use server"

    const email = formData.get('email');
    const password = formData.get('password');

    if(email === "" || password === ""){
       return 
    }

    try {
      const response = await api.post("/auth/login",{
        email,
        password
      })

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      cookies().set("session", response.data.token,{
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })
      
    } catch (error) {
      console.log("Error");
      console.log(error);
      return
    }


    redirect('/dashboard')
  }
  return (
     <>
        <div className={styles.containerCenter}>
          <Image
            src={logoImg}
            alt='Logo da Pizzaria'
          />

          <section className={styles.login}>
            <form action={handleLogin}>
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

              <Button type="submit" text="Acessar" />
            </form>

             {/* Remove a tag 'a' e aplica o className diretamente no Link */}
             <Link href='/signup' className={styles.text}> 
              Não possui uma conta? Cadastre-se
            </Link>
          </section>
        </div>
     </>
  );
}
