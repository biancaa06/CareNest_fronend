import { useState } from "react";
import SubNavbar from "../components/ManagersManagementPage/SubNavbar";
import CreateManagerAccountForm from "../components/ManagersManagementPage/CreateManagerAccountForm";
import ManagersList from "../components/ManagersManagementPage/ManagersList";

const ManagersManagementPage = () => {
    const [seeCreateAccountForm, setSeeCreateAccountForm] = useState(true);
    const [seePrManagerList, setSeePrManagersList] = useState(false);
    const [seeMedicalManagersList, setSeeMedicalManagerList] = useState(false);

    const positions = [
        { id: 1, name: "PR" },
        { id: 2, name: "MEDICAL" }
    ];

    const handleSeeCreateAccountForm = (e) => {
        e.preventDefault();
        setSeeCreateAccountForm(true);
        setSeePrManagersList(false);
        setSeeMedicalManagerList(false);
    };

    const handleSeeMedicalManagerList = (e) => {
        e.preventDefault();
        setSeeMedicalManagerList(true);
        setSeeCreateAccountForm(false);
        setSeePrManagersList(false);
    }

    const handleSeePrManagerList = (e) => {
        e.preventDefault();
        setSeePrManagersList(true);
        setSeeMedicalManagerList(false);
        setSeeCreateAccountForm(false);
    }

    return (
        <>
            <SubNavbar handleSeeCreateAccountForm={handleSeeCreateAccountForm} handleSeeMedicalManagerList={handleSeeMedicalManagerList}  handleSeePrManagerList={handleSeePrManagerList}/>
            <div className="page-background">
                <div className="flex justify-center mt-10 bg-custom-green">
                    {seeCreateAccountForm? (
                        <CreateManagerAccountForm positions={positions}/>
                    ) : 
                    seeMedicalManagersList? (
                        <ManagersList position={positions.find(pos => pos.name === "MEDICAL")}/>
                    ) : (
                        <ManagersList position={positions.find(pos => pos.name === "PR")}/>
                    )
                    }
                </div>
            </div>
            
        </>
    );
};

export default ManagersManagementPage;
