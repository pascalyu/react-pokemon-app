export default class AuthenticationServices {

    static isAuthenticated: boolean = false;

    static login(username: string, password: string): Promise<boolean> {

        const isAuthenticated = (username === "pikachu" && password === "pikachu");


        return new Promise(resolve => {

            setTimeout(() => {
                this.isAuthenticated = isAuthenticated;
                resolve(isAuthenticated);

            }, 1000);
        });
    }



}