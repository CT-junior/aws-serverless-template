import Room from "src/models/Room";

interface IRoomsRepository {
    create(qtd_camas: number): Promise<void>;
    findAll(): Promise<Room[]>;
    findById(id: string): Promise<Room>;
    update(room: Room): Promise<void>;
    delete(id: string): Promise<void>;
}

export default IRoomsRepository;