import DefaultLayout from "../Layout/DafaultLayout";

const SignUpPage = ({ updateLoggedInUser }) => {
    function signUp(event) {
        event.preventDefault()
        const form = event.target
        const data = Object.fromEntries(new FormData(form))
      
        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(user => updateLoggedInUser(user.name))
    }

    return (
        <DefaultLayout>
            <section className='sign-up'>
                <form action="" onSubmit={signUp}>
                    <h2>Sign Up:</h2>
                    <fieldset>
                        <label htmlFor="">Name: </label>
                        <input type="text" name="name" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="">Email: </label>
                        <input type="text" name="email" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="">Password: </label>
                        <input type="password" name="password" />
                    </fieldset>
                    <button>Sign Up</button>
                </form>
            </section>
        </DefaultLayout>
    )
}

export default SignUpPage