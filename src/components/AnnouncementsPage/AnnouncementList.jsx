import AnnouncementComponent from "./AnnouncementComponent.jsx";

function AnnouncementList({ announcements, claims, handleEditing}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {announcements && announcements.length > 0 ? ( 
                announcements.map((announcement) => (
                    <div key={announcement.id} className="col-span-1">
                        <AnnouncementComponent announcement={announcement} claims = {claims} handleEditing={handleEditing}/>
                    </div>
                ))
            ) : (
                <div className="text-center col-span-full">
                    <p className="text-lg text-gray-500">No announcements available</p>
                </div>
            )}
        </div>
    );
}

export default AnnouncementList;
