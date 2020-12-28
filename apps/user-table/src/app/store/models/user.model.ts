export interface User {
    id: number;
    name: string;
    username: string;
    organization: string;
    access: string;
    dateAdded: Date;
    noAccess: boolean;
    eiAnalysis: boolean;
    customMap: boolean;
    foreCasting: boolean;
}