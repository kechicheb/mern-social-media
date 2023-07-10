const UserImage = ({ image, size = "60px" }) => {
  return (
    <div className="rounded-full  w-16 h-16">
      <img
        className="h-16 w-16 rounded-full object-cover"
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;
