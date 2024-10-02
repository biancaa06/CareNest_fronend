const AnnouncementComponent = ({ announcement }) => {
    return (
        <div className="announcement-card">
            <div className="announcement-header">
                <img src={announcement.author.imageUrl} alt={announcement.author.name} />
                <div>
                    <p className="text-green-700 font-semibold">{announcement.author.name}</p>
                    <p className="text-gray-500 text-sm">{announcement.author.role}</p>
                </div>
            </div>
            <h3 className="announcement-title">{announcement.title}</h3>
            <p className="announcement-description">{announcement.description}</p>
            <p className="announcement-date">{announcement.date}</p>
        </div>
    );
}

export default AnnouncementComponent;
