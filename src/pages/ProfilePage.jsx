    import { useEffect, useState } from "react";
    import PersonalData from "../components/ProfilePage/PersonalData";
    import { useParams } from "react-router-dom";
    import { getBaseUserById } from "../services/UserRepository";
import Unauthorized_GoToLogin from "../components/authorization/Unauthorized_GoToLogin";

    const ProfilePage = ({claims}) =>{

        const { id } = useParams();
        const [user, setUser] = useState();
        const [error, setError] = useState("");
        const [authorized, setAuthorized] = useState(true);

        const fetchBaseUserById = async () =>{
            try{
                // if(claims?.userId && id == claims.userId){
                //     setAuthorized(true);
                // }
                const response = await getBaseUserById(id);
                setUser(response.data);
            }
            catch(error){
                if(error?.status == 401 || error.status == 403){
                    setAuthorized(false);
                }
                const errorMessage = error.response?.data?.detail || "An unexpected error occurred.";
                setError(errorMessage);
            }
        }

        useEffect(() => {
            fetchBaseUserById();
        }, []);

        if(!authorized){
            return(
                <Unauthorized_GoToLogin message="You are not authorized to see this user's profile. Please log into your own account!" />
            )
        }

        return (
            <>
            <div data-cy="profilePage" className="page-background">
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