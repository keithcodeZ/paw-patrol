export interface BookingModel{
    //USER ID
    uid: string;
    dateCreated: string;
    serviceName: string;
    price: number;
    date: string;
    time: string;
    address: string;
    status: string;
    //APPOINTMENT ID
    id: string;
    userName: string;
    petSpecies: string;
    petBreed: string;
    petAge: string;
    petGender: string;
    petWeight: string;
    user: any;
}