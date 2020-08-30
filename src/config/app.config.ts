
export class AppConfig{
    public getServerPort() {
        const port = process.env.PORT || 3000;
        return port;
    }
}