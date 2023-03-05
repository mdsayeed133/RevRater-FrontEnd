import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {getTop3Employees} from '../../Stores/ratingSlice'
import './homePage.css'
import logo from '../../Images/big_rmp_logo.41f961d.svg'
import anonymous from '../../Images/instructional-slide-mystery-lady.bf022e31.svg'
import editlady from '../../Images/instructional-slide-pencil-lady.492f2289.svg'
import thumb from '../../Images/instructional-slide-thumb-war.e03fdb37.svg'

const HomePage = () => {
    const loginUser = useSelector((state)=> state.auth.login);
    const top3Emp= useSelector((state)=> state.rating.top3Employees);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTop3Employees())
    },[dispatch])

    return(
    <div class="homepage">
        <div class="homepage-header">
            <img src={logo} alt="RateMyRevature Logo"/>
        </div>
        <p className='homepage-about'>RavRater is a social media application developed as our team's Assigned Project. It is designed to be a service where you can rate employees of revature anonymously, giving them a score between 1-10. You give a rational behind your rating when you make a post about a specific employee. To be absolutely clear, this service is a lot like RateYourProfessor, a similar social media application, but with a focus specifically on Revature.</p>
        <div className='homepage-emp'>
            <div class="homepage-emp-text">
                <div>
                    Here are the Three Highed Rated Employees
                </div>
                <div className='homepage-emp-cards'>
                    {!top3Emp && <h2>Loading. . .</h2>}
                    {top3Emp &&<p>{top3Emp[1].id}</p>}
                </div>
            </div>
        </div>
        <div class="homepage-join">
            {!loginUser &&
            <div class="homepage-join-text">
                <div>
                    Join the RevRater Family
                </div>
                <button class="homepage-join-button" onClick={()=> navigate("/register")}>Sign up now!</button>
                <div>
                    Love RR? Let's make it official.
                </div>
            </div>}
            <div class="homepage-join-cards">
                <div class="homepage-join-card">
                    <img alt="Lady with a pencil" src={editlady}/>
                    <div class="homepage-join-card-text">
                    Manage and edit your ratings
                    </div>
                </div>
                <div class="homepage-join-card">
                    <img alt="Person making an anonymous entry" src={anonymous}/>
                    <div class="homepage-join-card-text">
                    Your ratings are always anonymous
                    </div>
                </div>
                <div class="homepage-join-card">
                    <img alt="Thumb War" src={thumb}/>
                    <div class="homepage-join-card-text">
                        Like and Comment on ratings
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    );
};

export default HomePage;