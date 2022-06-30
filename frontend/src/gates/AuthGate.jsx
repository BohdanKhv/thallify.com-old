import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../features/user/userSlice';
import { Login } from '../pages'


const AuthGate = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, profile } = useSelector(state => state.user);

    useEffect(() => {
        // Check if expiresIn is already expired
        if (user && user.expiresIn && user.loginTime && ((+user.expiresIn * 1000) + (+user.loginTime)) < Date.now()) {
            console.log("Token expired, please login again");
            localStorage.removeItem('user');
            localStorage.removeItem('profile');
            navigate('/');
        } else if (user) {
            console.log('Token will expire in minutes: ', (((+user.expiresIn * 1000) + (+user.loginTime) - Date.now()) / 60000).toFixed(2));
        }

        if(user && !profile) {
            dispatch(getUserProfile());
        }
    }, [dispatch, navigate, user, profile]);

    return (
        user ? children : <Login />
    )
}

export default AuthGate