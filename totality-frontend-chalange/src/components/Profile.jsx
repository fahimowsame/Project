import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
    const { updateUser, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8800/api/auth/logout", {}, { withCredentials: true });
            localStorage.removeItem("user");
            updateUser(null);
            navigate("/");
        } catch (error) {
            console.log("Error logging out:", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex-3 overflow-y-scroll pb-16 md:pb-0 md:flex md:flex-col w-full max-w-screen-lg">
                <div className="wrapper px-8 md:px-0 md:py-8">
                    <div className="title flex items-center justify-between">
                        <h1 className="mb-5 text-2xl">User Information</h1>
                    </div>
                    <div className="info flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-4">
                            <span>Avatar:</span>
                            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" className="w-10 h-10 rounded-full" />
                        </div>
                        <div className="flex items-center gap-4">
                            <span>Username:</span>
                            <b>{currentUser.username}</b>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>E-mail:</span>
                            <b>{currentUser.email}</b>
                        </div>
                        <button onClick={handleLogout} className="w-36 bg-teal-500 text-white py-2 px-4 rounded-md cursor-pointer">Logout</button>
                    </div>
                </div>
            </div>
            <style>
                {`
                  .details::-webkit-scrollbar {
                    display: none;
                  }
                `}
            </style>
        </div>
    );
}

export default Profile;
