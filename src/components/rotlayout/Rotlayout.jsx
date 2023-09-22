import React from "react";
import "./rotlayout.css";
import { Outlet } from "react-router-dom";
import { BsLinkedin } from "react-icons/bs";
import Container from "../Container";
import Image from "../Image";
import profile from "../../assets/profile.jpeg";
import { TbLogout2 } from "react-icons/tb";
import { getAuth, signOut } from "firebase/auth";
import { userdata } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Rotlayout = () => {
    const auth = getAuth();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    let handellogout = () => {
        signOut(auth).then(() => {
            localStorage.removeItem("user");
            dispatch(userdata(null));
            navigate("/login");
        });
    };
    return (
        <>
            <div className="rotlayout_header">
                <Container>
                    <div className="rotlayout_box">
                        <BsLinkedin className="rotlayout_icon" />
                        <div style={{ position: "relative" }}>
                            <div className="rotlayout_profile_box">
                                <Image
                                    className="rotlayout_profile_img"
                                    imgsrc={profile}
                                />
                                <h3
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                    }}
                                >
                                    Dmitry Kargaev
                                </h3>
                            </div>
                            <TbLogout2
                                style={{
                                    position: "absolute",
                                    top: "24px",
                                    left: "155px",
                                    fontSize: "20px",
                                    cursor:"pointer"
                                }}
                                onClick={handellogout}
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <Outlet />
        </>
    );
};

export default Rotlayout;