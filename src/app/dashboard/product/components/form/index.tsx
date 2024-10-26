"use client"

import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image';
import Input from '@/app/components/input/Input';
import Button from '@/app/components/button/Button';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CategoryProps {
    id: string;
    name: string;
}

interface Props{
    categories: CategoryProps[]
}
export function Form({categories}: Props){
    const router = useRouter()
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");


    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type !== "image/jpeg" && image.type !== "image/png"){
                toast.warning("Formato não permitido")
                return false
            }

            setImage(image)
            setPreviewImage(URL.createObjectURL(image)) 
        }
    }

    async function handleRegisterProduct(formData: FormData){
        const category      = formData.get("category");
        const name          = formData.get("name");
        const price         = formData.get("price");
        const description   = formData.get("description");
        if(!category || !name || !price || !description || !image){
            toast.warning("Preencha todos os campos!")
            return false
        }

        const category_id = categories[Number(category)].id
        const data = new FormData(); 
        const token = getCookieClient()

        data.append("name", name);
        data.append("price", price);
        data.append("description", description);
        data.append("category_id", category_id);
        data.append("banner", image)

        await api.post("/product",data, {
            headers:{
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }).catch(err => {
            console.log("Erro ao cadastrar produto:", err.response || err.message || err);
            toast.warning("Falha ao cadastrar esse produto!");
            return false
        })


        router.push("/dashboard");
        toast.success("Produto cadastrado com sucesso!");

    }
    

    return (
        <main className={styles.container}>
            <h1>Novo produto</h1>
            <form action={handleRegisterProduct} className={styles.form}>
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color='#fff'/>
                    </span>
                    <input 
                        type="file"
                        accept='image/png, image/jpeg'
                        required
                        onChange={handleFile}
                    />
                    {previewImage && (
                        <Image
                          alt="Image de preview" 
                          src={previewImage} 
                          className={styles.preview}
                          fill={true}
                          quality={100}
                          priority={true}
                        /> 
                    )}
                </label>

                <select name="category">
                    {categories.map((category, index) => (
                        <option key={category.id} value={index}>
                            {category.name}
                        </option> 
                    ))}
                   
                </select>

                <Input
                    type="text"
                    name="name"
                    placeholder="Digite o nome do produto..."
                    required={true}
                />

                <Input
                    type="text"
                    name="price"
                    placeholder="Preço do produto..."
                    required={true}
                />

                <textarea 
                    className={styles.input} 
                    placeholder='Digite a descrição do produto'
                    required
                    name='description'
                ></textarea>

                <Button type="submit" text='Cadastrar' background='#3fffa3'/>
            </form>
        </main>
    )
}