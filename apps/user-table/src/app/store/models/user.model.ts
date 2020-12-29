export interface User {
    id: number;
    name: string;
    emailId: string;
    username: string;
    organization: string;
    access: string;
    dateAdded: number;
    noAccess: boolean;
    eiAnalysis: boolean;
    customMap: boolean;
    foreCasting: boolean;
}