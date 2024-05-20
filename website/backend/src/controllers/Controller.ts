class Controller {
    protected repository: any
    constructor() {
        Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(
            (key: string) => {
                const property = (this as any)[key] as Function
                if (property instanceof Function) {
                    ;(this as any)[key] = property.bind(this)
                }
            }
        )
    }
}

export default Controller
