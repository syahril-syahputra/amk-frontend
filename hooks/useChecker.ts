interface Checker {
    typeCheker: (string: string) => 'email' | 'phoneNumber' | 'other'
}

function useChecker(): Checker {
    const typeCheker = (str: string): 'email' | 'phoneNumber' | 'other' => {
        const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        const phoneRegex = /^\+\d{10,15}$/

        if (emailRegex.test(str)) {
            return 'email'
        }
        if (phoneRegex.test(str)) {
            return 'phoneNumber'
        }
        return 'other'
    }
    return { typeCheker }
}
export default useChecker
