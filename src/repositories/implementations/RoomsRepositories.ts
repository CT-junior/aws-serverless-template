import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import IRoomsRepository from '../IRoomsRepositories';
import { v4 as uuidv4 } from "uuid";
import Rooom from 'src/models/Room';

const firebaseConfig = {
    apiKey: "AIzaSyAugWyvlqfPQi0Z2COhoLv7O6JH0unUQkk",
    authDomain: "model-projeto-piloto.firebaseapp.com",
    projectId: "model-projeto-piloto",
    storageBucket: "model-projeto-piloto.appspot.com",
    messagingSenderId: "983743934853",
    appId: "1:983743934853:web:df99daf3653a681e5954ec",
    measurementId: "G-VXCT19PXRT"
};

const app = initializeApp(firebaseConfig);

class RoomsRepositories implements IRoomsRepository{
    private readonly db = getFirestore(app);

    async create(qtd_camas: number): Promise<void> {

        //Generate UUID (Universally Unique Identifier)
        // Or its just a random string
        const uuid = uuidv4();

        // Add a new document with a generated id.
        // with the data passed in the function
        await setDoc(doc(this.db, "quartos", uuid), {
            qtd_camas: qtd_camas
        });

        return undefined;

    }

    async findAll(): Promise<Rooom[]> {

        const quartosCollection = collection(this.db, 'quartos');
        const quartoSnapshot = await getDocs(quartosCollection);
        const quartoList = quartoSnapshot.docs.map(doc => doc.data());

        return quartoList as Rooom[];
    }

    async findById(id: string): Promise<Rooom> {

        const document = await getDoc(doc(this.db, "quartos", id));
        if(!document){
            console.log("Document not found!");
            return undefined;
        }

        const room = {
            id: document.id,
            qtd_camas: document.data().qtd_camas
        }

        return room;
    }

    async update(room: Rooom): Promise<void> {
        await updateDoc(doc(this.db, "quartos", room.id), 'qtd_camas', room.qtd_camas);
        return undefined;
    }
    
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}


export default RoomsRepositories;