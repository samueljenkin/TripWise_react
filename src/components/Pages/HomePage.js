import DefaultLayout from "../Layout/DafaultLayout";

const HomePage = ({ loggedInUser }) => {
    const user = loggedInUser ? loggedInUser : 'there'

    return (
        <DefaultLayout>
            <h1>Hello {user}!</h1>
        </DefaultLayout>
    )
}

export default HomePage