export default function UserProfile({params}: any){
    return(
        <div className="min-h-screen flex flex-col items-center justify-between">
            <h1>Profile</h1>
            <hr />
            <p>Profile page {params.id}</p>
        </div>
    )
}