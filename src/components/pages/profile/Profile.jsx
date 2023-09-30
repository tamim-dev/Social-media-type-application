import React, { useEffect, useState } from "react";
import "./profile.css";
import Grid from "@mui/material/Grid";
import Container from "../../Container";
import Image from "../../Image";
import profile from "../../../assets/profile.jpeg";
import cover from "../../../assets/cover.png";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { FaLocationArrow } from "react-icons/fa";
import Button from "@mui/material/Button";
import { Outlet, useLocation, Link } from "react-router-dom";
import Profileinfomation from "../../Profileinfomation";
import { SiGooglenews } from "react-icons/si";
import { BiEdit } from "react-icons/bi";
import User from "../../user/User";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { MuiTelInput } from "mui-tel-input";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

let initialvalue = {
    email: "",
    fullname: "",
    address: "",
    info: "",
    dateofbirth: "",
};

const Profile = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loginuser.loginuser);
    let location = useLocation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openContactbtn, setOpenContactbtn] = useState(false);
    const handleOpenContactbtn = () => setOpenContactbtn(true);
    const handleCloseContactbtn = () => setOpenContactbtn(false);
    const [phvalue, setPhvalue] = useState("");
    const [user, setUser] = useState([]);
    let [values, setValues] = useState(initialvalue);

    useEffect(() => {
        onValue(ref(db, "users/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setUser(arr);
        });
    }, []);

    let handelchange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    let handelupdateprofile = () => {
        set(ref(db, "users/" + userData.uid), {
            username: values.fullname,
            email: values.email,
            phonenumber: phvalue,
            address: values.address,
            dateofbirth: values.dateofbirth,
            info: values.info,
        }).then(() => {
            setOpen(false);
        });
    };

    return (
        <>
            <section className="profile_section">
                <Container>
                    <Grid container>
                        <Grid xs={9}>
                            {user.map(
                                (item) =>
                                    userData.uid == item.id && (
                                        <>
                                            <div className="profile_img_box">
                                                <div className="profile_part_cover">
                                                    <Image
                                                        className="profile_part_cover_img"
                                                        imgsrc={cover}
                                                    />
                                                    <Button
                                                        className="proflie_edit_btn"
                                                        variant="contained"
                                                        onClick={handleOpen}
                                                    >
                                                        <BiEdit />
                                                        Edit profile
                                                    </Button>
                                                </div>
                                                <div className="profile_part_profile">
                                                    <Image
                                                        className="profile_part_profile_img"
                                                        imgsrc={profile}
                                                    />
                                                </div>
                                            </div>
                                            <div className="profile_details_box">
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <h2
                                                        style={{
                                                            fontSize: "18px",
                                                            fontWeight: "700",
                                                        }}
                                                    >
                                                        {item.username}
                                                    </h2>
                                                    <p>
                                                        <FaLocationArrow
                                                            style={{
                                                                color: "#0275B1",
                                                                fontSize:
                                                                    "14px",
                                                                marginRight:
                                                                    "10px",
                                                            }}
                                                        />
                                                        {item.address}
                                                    </p>
                                                </div>
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        marginBottom: "15px",
                                                    }}
                                                >
                                                    {item.info}
                                                </p>
                                                <Button
                                                    className="button_color"
                                                    variant="contained"
                                                    onClick={
                                                        handleOpenContactbtn
                                                    }
                                                >
                                                    Contact info
                                                </Button>
                                            </div>
                                            <Modal
                                                open={openContactbtn}
                                                onClose={handleCloseContactbtn}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Typography
                                                        id="modal-modal-title"
                                                        variant="h6"
                                                        component="h2"
                                                    >
                                                        <h2>{item.username}</h2>
                                                    </Typography>
                                                    <Typography
                                                        id="modal-modal-description"
                                                        sx={{ mt: 2 }}
                                                    >
                                                        <div className="Contact_info_box">
                                                            <h3>
                                                                Phone number :{" "}
                                                            </h3>
                                                            <h4
                                                                style={{
                                                                    color: "#262626",
                                                                }}
                                                            >
                                                                {
                                                                    item.phonenumber
                                                                }
                                                            </h4>
                                                        </div>
                                                        <div className="Contact_info_box">
                                                            <h3>
                                                                Date of birth :{" "}
                                                            </h3>
                                                            <h4
                                                                style={{
                                                                    color: "#262626",
                                                                }}
                                                            >
                                                                {
                                                                    item.dateofbirth
                                                                }
                                                            </h4>
                                                        </div>
                                                        <div className="Contact_info_box">
                                                            <h3>
                                                                Email :{" "}
                                                            </h3>
                                                            <h4
                                                                style={{
                                                                    color: "#262626",
                                                                }}
                                                            >
                                                                {item.email}
                                                            </h4>
                                                        </div>
                                                    </Typography>
                                                </Box>
                                            </Modal>
                                        </>
                                    )
                            )}
                            {/*modal*/}

                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h5"
                                        component="h2"
                                    >
                                        Edit Profile
                                    </Typography>
                                    <Typography
                                        id="modal-modal-description"
                                        sx={{ mt: 2 }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <TextField
                                                style={{ width: "45%" }}
                                                id="outlined-basic"
                                                label="Name"
                                                variant="outlined"
                                                onChange={handelchange}
                                                name="fullname"
                                            />
                                            <TextField
                                                style={{ width: "50%" }}
                                                id="outlined-basic"
                                                label="Address"
                                                variant="outlined"
                                                onChange={handelchange}
                                                name="address"
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                margin: "20px 0",
                                            }}
                                        >
                                            <MuiTelInput
                                                label="Phone Number"
                                                variant="outlined"
                                                style={{ width: "50%" }}
                                                value={phvalue}
                                                onChange={(newValue) =>
                                                    setPhvalue(newValue)
                                                }
                                            />
                                            <TextField
                                                style={{ width: "45%" }}
                                                id="outlined-basic"
                                                label="Date of Birth"
                                                variant="outlined"
                                                type="date"
                                                focused
                                                onChange={handelchange}
                                                name="dateofbirth"
                                            />
                                        </div>
                                        <TextField
                                            style={{ width: "70%" }}
                                            id="outlined-basic"
                                            label="Email"
                                            variant="outlined"
                                            onChange={handelchange}
                                            name="email"
                                        />
                                        <TextField
                                            style={{
                                                width: "100%",
                                                margin: "20px 0",
                                            }}
                                            id="outlined-textarea"
                                            label="Info"
                                            placeholder="Placeholder"
                                            multiline
                                            onChange={handelchange}
                                            name="info"
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handelupdateprofile}
                                        >
                                            <BiEdit
                                                style={{
                                                    marginRight: "10px",
                                                    fontSize: "20px",
                                                }}
                                            />
                                            Update profile
                                        </Button>
                                    </Typography>
                                </Box>
                            </Modal>

                            {/*modal*/}
                            <div>
                                <div style={{ marginTop: "30px" }}>
                                    <Link to={"/social/profile"}>
                                        <button
                                            className={
                                                location.pathname ==
                                                "/social/profile"
                                                    ? "profile_button_active"
                                                    : "profile_button"
                                            }
                                        >
                                            PROFILE
                                        </button>
                                    </Link>
                                    <Link to={"/social/profile/friend"}>
                                        <button
                                            className={
                                                location.pathname ==
                                                "/social/profile/friend"
                                                    ? "profile_button_active"
                                                    : "profile_button"
                                            }
                                        >
                                            FRIENRS
                                        </button>
                                    </Link>
                                    <Link to={"/social/profile/post"}>
                                        <button
                                            className={
                                                location.pathname ==
                                                "/social/profile/post"
                                                    ? "profile_button_active"
                                                    : "profile_button"
                                            }
                                        >
                                            POST
                                        </button>
                                    </Link>
                                    <Link to={"/social/feed"}>
                                        <button
                                            className={
                                                location.pathname ==
                                                "/social/feed"
                                                    ? "profile_button_active"
                                                    : "profile_button"
                                            }
                                        >
                                            <SiGooglenews /> NEWSFEED
                                        </button>
                                    </Link>
                                </div>

                                {location.pathname == "/social/profile" && (
                                    <Profileinfomation />
                                )}
                            </div>
                        </Grid>
                        <Grid xs={3}>
                            <div className="sidebar_profile">
                                <div className="sidebar_profile_heading">
                                    <h4>User</h4>
                                    <Link
                                        style={{
                                            textDecoration: "none",
                                            color: "#0275b1",
                                        }}
                                        to={"/social/profile/user"}
                                    >
                                        <h4>view all</h4>
                                    </Link>
                                </div>
                                <User />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>
            <Outlet />
        </>
    );
};

export default Profile;
