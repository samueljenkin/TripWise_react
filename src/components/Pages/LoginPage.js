import DefaultLayout from "../Layout/DafaultLayout";

const LoginPage = ({ updateLoggedInUser }) => {
    const logIn = event => {
        event.preventDefault()
        const form = event.target
        const data = Object.fromEntries(new FormData(form))
      
        fetch('/api/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    console.log(res.error)
                } else {
                    updateLoggedInUser(res)
                }
            })
    }

    return (
        <DefaultLayout>
            <section className='log-in'>
                <form action="" onSubmit={logIn}>
                    <h2>Login:</h2>
                    <fieldset>
                        <label htmlFor="">Email: </label>
                        <input type="text" name="email" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="">Password: </label>
                        <input type="password" name="password" />
                    </fieldset>
                    <button>Log in</button>
                </form>
            </section>
        </DefaultLayout>
    )
}

export default LoginPage