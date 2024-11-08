    import { useEffect, useState } from "react";
    import PersonalData from "../components/ProfilePage/PersonalData";
    import { useParams } from "react-router-dom";
    import { getBaseUserById } from "../services/UserRepository";

    const ProfilePage = () =>{

        const { id } = useParams();
        const [user, setUser] = useState();
        const [error, setError] = useState("");

        const fetchBaseUserById = async () =>{
            try{
                const response = await getBaseUserById(id);
                setUser(response.data);
            }
            catch(error){
                const errorMessage = error.response?.data?.detail || "An unexpected error occurred.";
                setError(errorMessage);
            }
        }

        useEffect(() => {
            fetchBaseUserById();
        }, []);

        return (
            <>
            <div className="page-background">
            {
                error?(
                    <p>{error}</p>
                ):(
                    <>
                    <PersonalData user={user}/> 
                    </>
                )
            }
            </div>
            </>
        )
    }

    export default ProfilePage