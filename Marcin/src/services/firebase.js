import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
        signOut,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
} from "firebase/auth";


const firebaseConfig = {
        apiKey: "AIzaSyCFfAupYuRsCAXvxJKZvQ6jRUeIYVMXB0g",
        authDomain: "projeto-do-marcio-90129.firebaseapp.com",
        projectId: "projeto-do-marcio-90129",
        storageBucket: "projeto-do-marcio-90129.firebasestorage.app",
        messagingSenderId: "349970682343",
        appId: "1:349970682343:web:c1c7cf2c77e560a0cb2d42",
        measurementId: "G-00ED0BPSBE"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const registrar = async (email, senha) => {
        try {
                await createUserWithEmailAndPassword(
                        auth,
                        email,
                        senha
                );
                alert("Usuário registrado com sucesso!");
        } catch (error) {
                alert("Erro: " + error.message);
        }
};

export const login = async (email, senha) => {
        try {
                await signInWithEmailAndPassword(auth, email, senha);
                alert("Login realizado!");
        } catch (error) {
                alert("Erro: " + error.message);
        }
};

export const logout = async () => {
        await signOut(auth);
};