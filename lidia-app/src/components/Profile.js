import React from 'react';
import Button from 'react-bootstrap/Button';
import './profile-style.css';

const Profile = (props) => {
  

    const goToOwned = () => {
        props.history.push('/Profile/OwnedBids');
    }
    const goToWinned = () => {
            props.history.push({ pathname: '/Profile/WinnedBids' });
    }

    return (
        <div className='profile-btn'>
            <Button className='btn-win' onClick= {goToWinned}>WINNED BIDS</Button>
            <Button className='btn-own' onClick= {goToOwned}>OWNED BIDS</Button>
        </div>
    )
}
export default Profile;


