import Input from '@/app/components/input/page';
import styles from './styles.module.scss';
import Button from '@/app/components/button/page';
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';
import { redirect } from 'next/navigation';

export default function Category(){
    async function handleRegisterCategory(formData: FormData){
        "use server"
        const name = formData.get("name");

        if(name === ""){
            return
        }
        const data = {
            name: name
        }

        const token = getCookieServer();
        await api.post('/category',data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).catch((err) => {
            console.log(err);
            return
        })
        redirect("/dashboard")
    }

    return(
        <main className={styles.container}>
            <h1>Nova categoria</h1>
            <form className={styles.form} action={handleRegisterCategory}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Nome da categoria, ex Pizzas"
                    required={true}
                />
                <Button type="submit" text='Cadastrar' background='#3fffa3'/>
            </form>
        </main>
    )
}