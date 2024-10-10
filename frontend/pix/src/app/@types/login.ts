export type ResponseLogin = {
    token: string;
    exp: number;
};

export type ResponseSignUp = {
    email: string;
    id: string;
};


export type ResponseVerifyToken = {
    token: string;
    exp: number;
};