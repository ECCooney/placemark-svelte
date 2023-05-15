export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id: string;
}

export interface LoggedInUser {
    email: string;
    token: string;
    _id: string;
}

export interface Category {
    name: string;
    img: string;
    _id: string;
}

export interface Placemark {
    name: string;
    description: string;
    area: string;
    img?: string;
    category: Category;
    contributor: LoggedInUser;
    lat: number;
    lng: number;
    _id: string;
}

export interface CategoryPlacemarks {
    category: Category;
    placemarks: Placemark[];
}
