import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { thisUser } from '../redux/features/auth/loginSlice';

function BounceRoute() {
  const authenticated = useSelector(thisUser);
  return authenticated?.user ? <Navigate to="/" /> : <Outlet />;
}

export default BounceRoute;