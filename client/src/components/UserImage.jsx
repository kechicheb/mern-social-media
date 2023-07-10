const UserImage = ({ image, size }) => {
  return (
    <div
      className={!size ? "rounded-full  w-16 h-16" : "rounded-full w-14 h-14"}
    >
      <img
        className={
          !size
            ? "h-16 w-16 rounded-full object-cover"
            : "h-14 w-14 rounded-full object-cover"
        }
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;
